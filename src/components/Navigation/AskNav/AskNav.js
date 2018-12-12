import React from 'react';
import { NavLink } from 'react-router-dom';
import './AskNav.css';

const AskNav = () => (
  <div className="an_container">
    <NavLink
      className="an_navItem"
      to="/termsofuse"
      activeStyle={{
        color: '#dd6866'
      }}
    >
      이용약관
    </NavLink>
    <NavLink
      className="an_navItem"
      to="/infopolicy"
      activeStyle={{
        color: '#dd6866'
      }}
    >
      개인정보취급방침
    </NavLink>
    <NavLink
      className="an_navItem"
      to="/FAQ"
      activeStyle={{
        color: '#dd6866'
      }}
    >
      FAQ
    </NavLink>
    <NavLink
      className="an_navItem"
      to="/QnA"
      activeStyle={{
        color: '#dd6866'
      }}
    >
      관리자 문의
    </NavLink>
    <NavLink
      className="an_navItem"
      to="/Withdrawal"
      activeStyle={{
        color: '#dd6866'
      }}
    >
      회원 탈퇴
    </NavLink>
  </div>
);

export default AskNav;
