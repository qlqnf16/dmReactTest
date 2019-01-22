import React, { Component } from 'react';
import axios from '../../config/Axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import ChatPreview from '../components/Message/ChatPreview';
import messageSort from '../../utility/messageSortFunc';

const socket = io('http://52.78.187.58:3030');

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
        `users/${this.props.userData._id}/reservations`
      );
      const future = data.filter(d => !d.isDone && !d.isCanceled);
      const prev = data.filter(d => d.isDone || d.isCanceled);
      const sortData = future.concat(prev);
      const promises = [];
      sortData.forEach(reservation => {
        socket.emit('join', { reservationId: reservation._id });
        promises.push(
          new Promise((resolve, reject) => {
            try {
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
      <div className="m_containerStyle">
        <div style={containerStyle}>
          <div style={titleStyle}>메시지</div>
          <div>
            <div style={subtitleStyle}>
              * 진행중인 예약 건에서만 조회 가능합니다.
            </div>
            <div>{chats}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#dd6866',
    textAlign: 'left',
    margin: '33.5px 0 25px 0',
    paddingBottom: '6.9px',
    borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  }
};

const { containerStyle, titleStyle, subtitleStyle } = styles;

export default connect(mapStateToProps)(Message);
