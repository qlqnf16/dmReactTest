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
        <div className="mobile-drawer-items">
          <img className="mobile-drawer-logo" src={logo} alt="logo" />
        </div>
        <div className="mobile-drawer-items mobile-drawer-login">
          반갑습니다 {props.userData.name}님
        </div>
        <div className="mobile-drawer-items mobile-drawer-gray">마이페이지</div>
        <div className="mobile-drawer-items mobile-drawer-gray">메세지</div>
        <div
          className="mobile-drawer-items mobile-drawer-gray"
          onClick={props.logout}
        >
          로그아웃
        </div>
        <Link to="/designerlist">
          <div className="mobile-drawer-items" onClick={props.click}>
            막내찾기
          </div>
        </Link>
        <div className="mobile-drawer-items">막내등록</div>
        <div className="mobile-drawer-items">드리머리소개</div>
      </nav>
    );
  } else if (props.userData.uid && props.userData.isD) {
    return (
      <nav className={drawerClasses}>
        <div className="mobile-drawer-items">
          <img className="mobile-drawer-logo" src={logo} alt="logo" />
        </div>
        <div className="mobile-drawer-items mobile-drawer-login">
          반갑습니다 {props.userData.name}님
        </div>
        <div className="mobile-drawer-items mobile-drawer-gray">메세지</div>
        <div
          className="mobile-drawer-items mobile-drawer-gray"
          onClick={props.logout}
        >
          로그아웃
        </div>
        <div className="mobile-drawer-items">왜?</div>
        <div className="mobile-drawer-items">예약관리</div>
        <div className="mobile-drawer-items">스케줄등록</div>
        <div className="mobile-drawer-items">이용권관리</div>
        <div className="mobile-drawer-items">회원정보관리</div>
        <div className="mobile-drawer-items">추천인/쿠폰</div>
      </nav>
    );
  } else if (!props.userData.uid) {
    return (
      <nav className={drawerClasses}>
        <div className="mobile-drawer-items">
          <img className="mobile-drawer-logo" src={logo} alt="logo" />
        </div>
        <div
          className="mobile-drawer-items mobile-drawer-login"
          onClick={props.loginToggleHandler}
        >
          로그인
        </div>
        <div className="mobile-drawer-items mobile-drawer-gray">막내찾기</div>
        <div className="mobile-drawer-items mobile-drawer-gray">막내등록</div>
        <div className="mobile-drawer-items">드리머리소개</div>
        <div
          className="mobile-drawer-items"
          onClick={props.signUpToggleHandler}
        >
          회원가입
        </div>
      </nav>
    );
  } else {
    return <div />;
  }
};

export default DrawerItems;
