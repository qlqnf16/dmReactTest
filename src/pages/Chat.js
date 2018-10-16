import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PageCss.css';

class Chat extends Component {
  render() {
    return (
      <div className="container-fluid me pt-2">
        <div className="me_bg">
          <div className="u_title">메시지</div>
          <div className="row" style={{ marginTop: '4%' }}>
            <div className="col-md-2 me_title">
              <Link to="/message" className="cp_link">
                전체메시지
              </Link>
            </div>
            <div className="col-md-10">채팅내용을 쓰세용</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
