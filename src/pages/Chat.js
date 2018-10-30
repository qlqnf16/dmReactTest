import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import deparam from 'deparam';
import { connect } from 'react-redux';
import './PageCss.css';
import ChatBox from '../components/Message/ChatBox';

const socket = io('http://54.180.92.115:3000'); // 실제 chat 서버 주소

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      textfield: ''
    };

    socket.on('newMessage', params => {
      this.setState({
        messages: this.state.messages.concat({
          content: params.content,
          from: params.from,
          to: params.to,
          createdAt: params.createdAt
        }),
        textfield: ''
      });
    });
  }

  componentDidMount() {
    if (!this.state.messages) {
      const params = deparam(this.props.location.search.slice(1));

      socket.emit('join', {
        reservationId: params.r
      });
      socket.emit(
        'getMessages',
        {
          reservationId: params.r
        },
        messages => {
          this.setState({ messages });
          console.log(messages);
        }
      );
    }
  }

  sendMessageHandler = msg => {
    const params = deparam(this.props.location.search.slice(1));
    socket.emit('createMessage', {
      content: msg,
      from: this.props.userData.name,
      to: params.n,
      reservationId: params.r
    });
  };

  changeHandler = event => {
    this.setState({
      textfield: event.target.value
    });
  };

  render() {
    const params = deparam(this.props.location.search.slice(1));
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
            <div className="col-8">
              <ChatBox
                messages={this.state.messages}
                sendMessage={() =>
                  this.sendMessageHandler(this.state.textfield)
                }
                change={this.changeHandler}
                textfield={this.state.textfield}
                reservationId={params.r}
              />
            </div>
            <div className="col-2" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Chat);
