import React from 'react';
import { NavLink } from 'react-router-dom';
import './UserNav.css';

const UserNav = () => (
  <div className="un_bg">
    <div className="un_header">마이페이지</div>
    <div className="un_navBack">
      <NavLink
        // 장막
        // to="/reservations"
        to="/userinfo"
        onClick={() => alert('아직 이용하실 수 없습니다.')}
        className="un_navItem"
        // activeStyle={{
        //   color: '#1f3354',
        //   borderBottom: 'solid 1.8px #1f3354'
        // }}
      >
        예약관리
      </NavLink>
      {/* <NavLink
        to="/likedesigner"
        className="un_navItem"
        activeStyle={{
          color: '#1f3354',
          borderBottom: 'solid 1.8px #1f3354'
        }}
      >
        찜한예디
      </NavLink> */}
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
        // 장막
        // to="/coupon"
        to="/userinfo"
        onClick={() => alert('아직 이용하실 수 없습니다.')}
        className="un_navItem"
        // activeStyle={{
        //   color: '#1f3354',
        //   borderBottom: 'solid 1.8px #1f3354'
        // }}
      >
        프로모션
      </NavLink>
    </div>
  </div>
);

export default UserNav;
