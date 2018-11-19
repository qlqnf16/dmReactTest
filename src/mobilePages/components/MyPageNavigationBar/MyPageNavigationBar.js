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
        // to="/userinfo"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
        // onClick={() => alert('아직 이용할 수 없습니다.')}
      >
        예약관리
      </NavLink>

      {/* <NavLink
        to="/likedesigner"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
      >
        찜한 예디
      </NavLink> */}
      <NavLink
        to="/userInfo"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
      >
        회원정보관리
      </NavLink>
      <NavLink
        to="/coupon"
        // to="/userinfo"
        className="unav_navitem"
        activeStyle={{
          color: '#dd6866',
          borderBottom: 'solid 1.8px #dd6866'
        }}
        // onClick={() => alert('아직 이용할 수 없습니다.')}
      >
        프로모션
      </NavLink>
    </div>
  </Fragment>
);

export default MyPageNavigationBar;
