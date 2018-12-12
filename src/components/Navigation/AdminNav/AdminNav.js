import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => (
  <div style={{ marginTop: '50px' }}>
    <NavLink
      className="m-2 lg"
      to="/admin/userlist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      유저리스트
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/designerlist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      디자이너리스트
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/waitinglist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      대기디자이너
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/reservationlist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      예약 리스트
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/cardList"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      카드 리스트
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/noshow"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      노쇼 관리
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/makecoupon"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      쿠폰 발행
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/qna"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      QnA
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/withdrawal"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      회원탈퇴
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/yeinbub"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      예인법
    </NavLink>
  </div>
);

export default AdminNav;
