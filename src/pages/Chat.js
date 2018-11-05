import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import deparam from 'deparam';
import axios from 'axios';
import { connect } from 'react-redux';
import './PageCss.css';
import ChatBox from '../components/Message/ChatBox';
import { callbackify } from 'util';

let names;

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: null,
      textfield: '',
      checkPoints: {},
      reservationData: {},
      madeRequest: false
    };

    if (this.props.socket)
      this.props.socket.on('newMessage', params => {
        this.setState({
          messages: this.state.messages.concat({
            content: params.content,
            from: params.from,
            to: params.to,
            createdAt: params.createdAt,
            checked: params.checked
          }),
          textfield: ''
        });
      });

    if (this.props.socket)
      this.props.socket.on('newCheckPoints', params => {
        this.setState({ checkPoints: params.checkPoints });
      });
  }

  async componentDidMount() {
    const params = deparam(this.props.location.search.slice(1));
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${
          this.props.userData._id
        }/reservations/${params.r}`
      );
      await this.setState({ reservationData: data, madeRequest: true });
    }
    if (!this.state.messages) {
      if (this.props.socket)
        this.props.socket.emit('join', {
          reservationId: params.r
        });
      if (this.props.socket)
        this.props.socket.emit(
          'joinChat',
          {
            reservationId: params.r
          },
          () => {
            const names = [
              this.props.userData.name,
              this.state.reservationData._designer.name ===
              this.props.userData.name
                ? this.state.reservationData._user.name
                : this.state.reservationData._designer.name
            ];
            if (this.props.socket)
              this.props.socket.emit(
                'updateCheckpoint',
                {
                  reservationId: params.r,
                  names
                },
                checkPoints => {}
              );
          }
        );
      if (this.props.socket) {
        this.props.socket.emit(
          'getMessages',
          {
            reservationId: params.r
          },
          (messages, checkPoints) => {
            this.setState({ messages, checkPoints });
          }
        );
      }
    }
  }

  getMoreMessagesHandler = callback => {
    const params = deparam(this.props.location.search.slice(1));
    this.props.socket.emit(
      'getMoreMessages',
      {
        reservationId: params.r,
        msgNum: this.state.messages.length
      },
      (messages, checkPoints) => {
        this.setState({ messages, checkPoints });
        callback();
      }
    );
  };

  sendMessageHandler = msg => {
    if (msg === '') return;
    const params = deparam(this.props.location.search.slice(1));
    const names = [
      this.props.userData.name,
      this.state.reservationData._designer.name === this.props.userData.name
        ? this.state.reservationData._user.name
        : this.state.reservationData._designer.name
    ];
    if (this.props.socket)
      this.props.socket.emit(
        'createMessage',
        {
          content: msg,
          from: names[0],
          to: names[1],
          reservationId: params.r
        },
        () => {
          if (this.props.socket)
            this.props.socket.emit(
              'updateCheckpoint',
              {
                reservationId: params.r,
                names
              },
              checkPoints => {
                this.setState({ checkPoints });
              }
            );
        }
      );
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
                names={names}
                checkPoints={this.state.checkPoints}
                change={this.changeHandler}
                textfield={this.state.textfield}
                reservationId={params.r}
                reservationData={this.state.reservationData}
                madeRequest={this.state.madeRequest}
                moreMessages={this.getMoreMessagesHandler}
              />
            </div>
            <div className="col-2" />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData, socket } }) => {
  return { userData, socket };
};

export default connect(mapStateToProps)(Chat);
