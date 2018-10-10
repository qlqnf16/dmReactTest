import React, { Component } from 'react';
import ChatPreview from '../components/Message/chatPreview';

class Message extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="m-5">메세지 창이랍니다</h1>
        <div className="row">
          <h5 className="col-md-2">전체메시지</h5>
          <div className="col-md-10">
            <ChatPreview />
            <ChatPreview />
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
