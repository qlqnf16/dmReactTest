import React from 'react';
import { NavLink } from 'react-router-dom';

const AskNav = () => (
  <div>
    <NavLink
      className="m-2 lg"
      to="/termsofuse"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      이용약관
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/infopolicy"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      개인정보취급방침
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/FAQ"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      FAQ
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/QnA"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      관리자 문의
    </NavLink>
  </div>
);

export default AskNav;
