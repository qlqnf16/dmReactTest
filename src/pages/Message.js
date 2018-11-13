import React, { Component } from 'react';
import axios from '../config/Axios';
import { connect } from 'react-redux';

import ChatPreview from '../components/Message/chatPreview';
import messageSort from '../utility/messageSortFunc';
import './PageCss.css';
// import { connectSocket } from '../modules/authentication';

// const socket = io('http://54.180.92.115:3030'); // 실제 chat 서버 주소

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null
    };

    if (this.props.socket)
      this.props.socket.on('newMessage', params => {
        this.setState({ messages: null });
      });
  }

  async componentDidMount() {
    if (!this.state.messages) {
      const { data } = await axios.get(
        `users/${this.props.userData._id}/reservations`
      );

      const future = data.filter(d => !d.isDone && !d.isCanceled);
      const prev = data.filter(d => d.isDone || d.isCanceled);
      const sortData = future.concat(prev);
      const promises = [];
      sortData.forEach(reservation => {
        if (this.props.socket)
          this.props.socket.emit('join', { reservationId: reservation._id });
        promises.push(
          new Promise((resolve, reject) => {
            try {
              if (this.props.socket)
                this.props.socket.emit(
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
                      checkPoints,
                      date: reservation.date,
                      finished: reservation.isDone || reservation.isCanceled
                    })
                );
            } catch (e) {
              reject(e);
            }
          })
        );
      });
      const messages = await Promise.all(promises);
      messages.sort(messageSort);
      this.setState({
        messages
      });
    }
  }

  async componentDidUpdate() {
    if (!this.state.messages) {
      const { data } = await axios.get(
        `users/${this.props.userData._id}/reservations`
      );
      const future = data.filter(d => !d.isDone && !d.isCanceled);
      const prev = data.filter(d => d.isDone || d.isCanceled);
      const sortData = future.concat(prev);
      const promises = [];
      sortData.forEach(reservation => {
        if (this.props.socket)
          this.props.socket.emit('join', { reservationId: reservation._id });
        promises.push(
          new Promise((resolve, reject) => {
            if (this.props.socket)
              this.props.socket.emit(
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
                    checkPoints,
                    date: reservation.date,
                    finished: reservation.isDone || reservation.isCanceled
                  })
              );
          })
        );
      });
      const messages = await Promise.all(promises);
      messages.sort(messageSort);
      this.setState({
        messages
      });
    }
  }

  showChat = reservationId => {
    this.props.history.push(`/chat?r=${reservationId}`);
  };

  render() {
    let chats = '로딩중...';
    if (this.state.messages) {
      chats = this.state.messages.map((message, key) => {
        const latest = message.messages[message.messages.length - 1];
        return (
          <ChatPreview
            key={key}
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
            finished={message.finished}
            showChat={this.showChat}
            date={message.date}
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
const mapStateToProps = ({ authentication: { userData, socket } }) => {
  return { userData, socket };
};

export default connect(mapStateToProps)(Message);
