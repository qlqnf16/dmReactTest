import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import ChatPreview from '../components/Message/chatPreview';
import './PageCss.css';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null
    };
  }

  async componentDidMount() {
    if (!this.state.messages) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${
          this.props.userData._id
        }/reservations`
      );
      this.setState({
        messages: data
      });
    }
  }

  render() {
    let chats = '로딩중...';
    if (this.state.messages) {
      chats = this.state.messages.map(message => (
        <ChatPreview
          name={
            message._designer.name === this.props.userData.name
              ? message._user.name
              : message._designer.name
          }
          reservationId={message._id}
        />
      ));
    }
    return (
      <div className="container-fluid me pt-2">
        <div className="me_bg">
          <div className="u_title">메시지</div>
          <div className="row" style={{ marginTop: '4%' }}>
            <div className="col-2 me_title">
              <Link to="/message" className="cp_link">
                전체메시지
              </Link>
            </div>
            <div className="col-10">{chats}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Message);
