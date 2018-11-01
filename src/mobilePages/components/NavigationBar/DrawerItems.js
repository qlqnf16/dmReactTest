import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

const DrawerItems = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  if (props.userData.uid && !props.userData.isD) {
    return (
      <nav className={drawerClasses}>
        <Link to="/">
          <div className="mobile-drawer-items" onClick={props.click}>
            <img className="mobile-drawer-logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="mobile-drawer-items mobile-drawer-login">
          반갑습니다 {props.userData.name}님
        </div>
        <Link to="reservations">
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            onClick={props.click}
          >
            마이페이지
          </div>
        </Link>
        <Link to="/message">
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            onClick={props.click}
          >
            메세지
          </div>
        </Link>
        <div
          className="mobile-drawer-items mobile-drawer-gray"
          onClick={props.logout}
        >
          로그아웃
        </div>
        <Link to="/designerlist">
          <div className="mobile-drawer-items" onClick={props.click}>
            예디찾기
          </div>
        </Link>
        <Link to="/whyDreamary">
          <div className="mobile-drawer-items" onClick={props.click}>
            예디등록
          </div>
        </Link>
        <Link to="/about">
          <div className="mobile-drawer-items" onClick={props.click}>
            드리머리소개
          </div>
        </Link>
      </nav>
    );
  } else if (props.userData.uid && props.userData.isD) {
    return (
      <nav className={drawerClasses}>
        <Link to="/">
          <div className="mobile-drawer-items" onClick={props.click}>
            <img className="mobile-drawer-logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="mobile-drawer-items mobile-drawer-login">
          반갑습니다 {props.userData.name}님
        </div>
        <Link to="/message">
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            onClick={props.click}
          >
            메세지
          </div>
        </Link>
        <div
          className="mobile-drawer-items mobile-drawer-gray"
          onClick={props.logout}
        >
          로그아웃
        </div>
        <Link to="/whydreamary">
          <div className="mobile-drawer-items" onClick={props.click}>
            왜?
          </div>
        </Link>
        <Link to="/designer/reservations">
          <div className="mobile-drawer-items" onClick={props.click}>
            예약관리
          </div>
        </Link>
        <Link to="/designer/schedule">
          <div className="mobile-drawer-items" onClick={props.click}>
            스케줄등록
          </div>
        </Link>
        <Link to="/designer/ticket">
          <div className="mobile-drawer-items" onClick={props.click}>
            이용권관리
          </div>
        </Link>
        <Link to="/designer/info">
          <div className="mobile-drawer-items" onClick={props.click}>
            회원정보관리
          </div>
        </Link>
        <Link to="/designer/coupon">
          <div className="mobile-drawer-items" onClick={props.click}>
            프로모션
          </div>
        </Link>
      </nav>
    );
  } else {
    return (
      <nav className={drawerClasses}>
        <Link to="/">
          <div className="mobile-drawer-items" onClick={props.click}>
            <img className="mobile-drawer-logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div
          className="mobile-drawer-items mobile-drawer-login"
          onClick={props.loginToggleHandler}
        >
          로그인
        </div>
        <Link to="/designerlist">
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            onClick={props.click}
          >
            예디찾기
          </div>
        </Link>
        <Link to="/addDesigner">
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            onClick={props.click}
          >
            예디등록
          </div>
        </Link>
        <Link to="/about">
          <div className="mobile-drawer-items" onClick={props.click}>
            드리머리소개
          </div>
        </Link>
        <div
          className="mobile-drawer-items"
          onClick={props.signUpToggleHandler}
        >
          회원가입
        </div>
      </nav>
    );
  }
};

export default DrawerItems;
