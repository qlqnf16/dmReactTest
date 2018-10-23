import React from 'react';
import logo from '../../../assets/images/logo.png';
import './SideDrawer.css';

const SideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  return (
    <nav className={drawerClasses}>
      <div className="mobile-drawer-items">
        <img className="mobile-drawer-logo" src={logo} alt="logo" />
      </div>
      <div className="mobile-drawer-items mobile-drawer-login">로그인</div>
      <div className="mobile-drawer-items mobile-drawer-gray">막내찾기</div>
      <div className="mobile-drawer-items mobile-drawer-gray">막내등록</div>
      <div className="mobile-drawer-items">드리머리소개</div>
      <div className="mobile-drawer-items">회원가입</div>
    </nav>
  );
};

export default SideDrawer;
