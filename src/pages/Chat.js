import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="m-5">1:1 채팅창이랍니다</h1>
        <div className="row">
          <h5 className="col-md-2">메시지</h5>
          <div className="col-md-10">
            <div>채팅내용을 쓰세요</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
