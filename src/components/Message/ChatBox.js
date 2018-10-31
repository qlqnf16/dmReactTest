import React, { Component } from 'react';
import attach from '../../assets/images/attach.png';
import default_people from '../../assets/images/Default_guy-01.jpg';
import alart from '../../assets/images/alart.png';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ChatBox extends Component {
  state = {
    // reservationData: {},
    // madeRequest: false
  };
  componentDidMount = async () => {
    // if (!this.state.madeRequest) {
    //   const { data } = await axios.get(
    //     `http://52.79.227.227:3030/users/${
    //       this.props.userData._id
    //     }/reservations/${this.props.reservationId}`
    //   );
    //   console.log(data);
    //   await this.setState({ reservationData: data, madeRequest: true });
    // }
  };

  componentWillUnmount() {
    this.props.socket.emit('leaveChat', {
      reservationId: this.props.reservationId
    });
  }

  timeParse = time => {
    const hour = Math.floor(time / 60);
    let minute = time % 60;
    if (minute === 0) minute = '00';
    return `${hour}:${minute}`;
  };

  render() {
    if (this.props.madeRequest) {
      let otherName = '';
      let otherName2 = '';
      if (
        this.props.userData.name === this.props.reservationData._designer.name
      ) {otherName = this.props.reservationData._user.name;
        otherName2 = '모델';}
      else {otherName = this.props.reservationData._designer.name;
      otherName2 = '예디'}
      let messages = '로딩중';
      if (this.props.messages) {
        messages = this.props.messages.map((message, key) => (
          <div
            key={key}
            className={`chat_back_${message.from === otherName ? 1 : 2}`}
          >
            <div
              className={`chat_bubbleBack_${
                message.from === otherName ? 1 : 2
              }`}
            >
              <div className="d-flex">
                <div
                  className={`chat_bubble_${
                    message.from === otherName ? 1 : 2
                  }`}
                >
                  {message.content}
                </div>
                <div className="chat_new">
                  {console.log(message.from)}
                  {message.from !== otherName &&
                  (!this.props.checkPoints[otherName] ||
                    this.props.checkPoints[otherName] < message.createdAt)
                    ? 1
                    : null}
                </div>
              </div>
              <div className="chat_time">
                <Moment format="YYYY/MM/DD HH:mm">{message.createdAt}</Moment>
              </div>
            </div>
          </div>
        ));
      }
      return (
        <div className="chat_box">
          <div className="chat_title row m-0">
            <div className="col-1 px-0">
              <img src={default_people} alt="alt" className="chat_profile" />
            </div>
            <div className="col-8 px-0">
              <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                {otherName} {otherName2}
              </div>
              <div>
                {' '}
                서비스날짜:{' '}
                <Moment format="YYYY/MM/DD">
                  {this.props.reservationData.date}
                </Moment>{' '}
                {this.timeParse(this.props.reservationData.time.since)}~
                {this.timeParse(this.props.reservationData.time.until)}
              </div>
            </div>
            <div className="mr-3 ml-auto ">
              <Link to="/QnA">
                <div className="chat_report row px-2 pt-2">
                  <div>
                    <img src={alart} alt="alt" style={{ width: '2rem' }} />
                  </div>
                  <div style={{ padding: '0.5rem' }}>직거래 신고하기</div>
                </div>
              </Link>
            </div>
          </div>
          <div className="chat_content">{messages}</div>
          <div className="chat_bottom row m-0">
            <div className="col-10 px-0">
              <input
                type="text"
                placeholder="안전한 거래를 위해 연락처 공개 및 직거래(유도) 시 사이트 이용이 제한될 수 있습니다."
                className="if_input rounded"
                onChange={this.props.change}
                value={this.props.textfield}
                onKeyUp={e => {
                  if (e.keyCode === 13) this.props.sendMessage();
                }}
              />
            </div>
            <div className="col-2 pr-0">
              <div className="chat_button" onClick={this.props.sendMessage}>
                전송
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(ChatBox);
