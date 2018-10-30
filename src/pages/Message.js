import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import ChatPreview from '../components/Message/chatPreview';
import messageSort from '../utility/messageSortFunc';
import './PageCss.css';

const socket = io('http://54.180.92.115:3001'); // 실제 chat 서버 주소

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null
    };

    socket.on('newMessage', params => {
      this.setState({ messages: null });
    });
  }

  async componentDidMount() {
    if (!this.state.messages) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${
          this.props.userData._id
        }/reservations`
      );
      const promises = [];
      data.forEach(reservation => {
        socket.emit('join', { reservationId: reservation._id });
        promises.push(
          new Promise((resolve, reject) => {
            socket.emit(
              'getMessages',
              {
                reservationId: reservation._id
              },
              (messages, checkPoints) =>
                resolve({
                  id: reservation._id,
                  messages,
                  designerName: reservation._designer.name,
                  userName: reservation._user.name,
                  checkPoints
                })
            );
          })
        );
      });
      const messages = await Promise.all(promises);

      console.log(messages);
      messages.sort(messageSort);
      this.setState({
        messages
      });
    }
  }

  async componentDidUpdate() {
    if (!this.state.messages) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${
          this.props.userData._id
        }/reservations`
      );
      const promises = [];
      data.forEach(reservation => {
        socket.emit('join', { reservationId: reservation._id });
        promises.push(
          new Promise((resolve, reject) => {
            socket.emit(
              'getMessages',
              {
                reservationId: reservation._id
              },
              (messages, checkPoints) =>
                resolve({
                  id: reservation._id,
                  messages,
                  designerName: reservation._designer.name,
                  userName: reservation._user.name,
                  checkPoints
                })
            );
          })
        );
      });
      const messages = await Promise.all(promises);

      console.log(messages);
      messages.sort(messageSort);
      this.setState({
        messages
      });
    }
  }

  render() {
    let chats = '로딩중...';
    if (this.state.messages) {
      chats = this.state.messages.map(message => {
        const latest = message.messages[message.messages.length - 1];
        return (
          <ChatPreview
            name={
              message.designerName === this.props.userData.name
                ? message.userName
                : message.designerName
            }
            latest={latest}
            reservationId={message.id}
            redDot={
              !!(
                latest &&
                message.checkPoints &&
                ((latest.from !== this.props.userData.name &&
                  !message.checkPoints[this.props.userData.name]) ||
                  message.checkPoints[this.props.userData.name] <
                    latest.createdAt)
              )
            }
          />
        );
      });
    }
    return (
      <div className="container-fluid me pt-2">
        <div className="me_bg">
          <div className="u_title">메시지</div>
          <div className="row" style={{ marginTop: '4%' }}>
            <div className="col-2 me_title ">전체메시지</div>
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
