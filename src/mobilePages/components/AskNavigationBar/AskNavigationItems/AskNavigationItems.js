import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AskNavigationItems.css';

class AskNavigationItems extends Component {
  render() {
    return this.props.show ? (
      <div className="m_asknavitem_back">
        <Link to="/termsofuse" style={{ textDecoration: 'none' }}>
          <div className="m_asknavitem">이용약관</div>
        </Link>
        <Link to="/infoPolicy" style={{ textDecoration: 'none' }}>
          <div className="m_asknavitem">개인정보취급방침</div>
        </Link>
        <Link to="/FAQ" style={{ textDecoration: 'none' }}>
          <div className="m_asknavitem">FAQ</div>
        </Link>
        <Link to="/QnA" style={{ textDecoration: 'none' }}>
          <div className="m_asknavitem">관리자문의</div>
        </Link>
        <Link to="/Withdrawal" style={{ textDecoration: 'none' }}>
          <div className="m_asknavitem">회원탈퇴</div>
        </Link>
      </div>
    ) : null;
  }
}

export default AskNavigationItems;
