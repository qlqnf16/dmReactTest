import React, { Fragment } from 'react';
import './MyPageNavigationBar.css';
import MyPageHeader from './MyPageHeader';
import { NavLink } from 'react-router-dom';

const MyPageNavigationBar = () => (
  <Fragment>
    <MyPageHeader />
    <div className="mobile-sub-menu">
      <NavLink
        to="/reservations"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
      >
        예약관리
      </NavLink>
      <NavLink
        to="/likedesigner"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
      >
        스케줄등록
      </NavLink>
      <NavLink
        to="/userInfo"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
      >
        이용권관리
      </NavLink>
      <NavLink
        to="/coupon"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
      >
        프로모션
      </NavLink>
    </div>
  </Fragment>
);

export default MyPageNavigationBar;
