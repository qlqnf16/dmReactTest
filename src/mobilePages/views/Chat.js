import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import deparam from 'deparam';
import axios from 'axios';
import { connect } from 'react-redux';
import ChatBox from '../components/Message/ChatBox';

const socket = io('http://54.180.92.115:3030'); // 실제 chat 서버 주소
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

    socket.on('newMessage', params => {
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

    socket.on('newCheckPoints', params => {
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
      socket.emit('join', {
        reservationId: params.r
      });
      socket.emit(
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
          socket.emit(
            'updateCheckpoint',
            {
              reservationId: params.r,
              names
            },
            checkPoints => {}
          );
        }
      );
      socket.emit(
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

  sendMessageHandler = msg => {
    if (msg === '') return;
    const params = deparam(this.props.location.search.slice(1));
    const names = [
      this.props.userData.name,
      this.state.reservationData._designer.name === this.props.userData.name
        ? this.state.reservationData._user.name
        : this.state.reservationData._designer.name
    ];
    socket.emit(
      'createMessage',
      {
        content: msg,
        from: names[0],
        to: names[1],
        reservationId: params.r
      },
      () => {
        socket.emit(
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
      <div>
        <div>
          <div>메시지</div>
          <div>
            <div>
              <Link to="/message" className="cp_link">
                전체메시지
              </Link>
            </div>
            <div>
              <ChatBox
                messages={this.state.messages}
                sendMessage={() =>
                  this.sendMessageHandler(this.state.textfield)
                }
                names={names}
                socket={socket}
                checkPoints={this.state.checkPoints}
                change={this.changeHandler}
                textfield={this.state.textfield}
                reservationId={params.r}
                reservationData={this.state.reservationData}
                madeRequest={this.state.madeRequest}
              />
            </div>
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
