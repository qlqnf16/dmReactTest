import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserNav.css';

const UserNav = () => (
  <div className="un_bg">
    <div className="un_header">마이페이지</div>
    <div className="un_navBack">
      <NavLink
        to="/reservations"
        className="un_navItem"
        activeStyle={{
          color: '#1f3354',
          borderBottom: 'solid 1.8px #1f3354'
        }}
      >
        예약관리
      </NavLink>
      <NavLink
        to="/likedesigner"
        className="un_navItem"
        activeStyle={{
          color: '#1f3354',
          borderBottom: 'solid 1.8px #1f3354'
        }}
      >
        찜한 막내
      </NavLink>
      <NavLink
        to="/userInfo"
        className="un_navItem"
        activeStyle={{
          color: '#1f3354',
          borderBottom: 'solid 1.8px #1f3354'
        }}
      >
        회원정보관리
      </NavLink>
      <NavLink
        to="/coupon"
        className="un_navItem"
        activeStyle={{
          color: '#1f3354',
          borderBottom: 'solid 1.8px #1f3354'
        }}
      >
        추천인/쿠폰
      </NavLink>
      <NavLink
        to="/messege"
        className="un_navItem"
        activeStyle={{
          color: '#1f3354',
          borderBottom: 'solid 1.8px #1f3354'
        }}
      >
        메세지
      </NavLink>
    </div>
  </div>
);

export default UserNav;
