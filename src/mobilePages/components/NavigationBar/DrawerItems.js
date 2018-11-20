import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.png';

const DrawerItems = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  if (!props.finishRedux) {
    return (
      <div className="navbar_loading">
        <div className="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  } else if (props.userData.uid && !props.userData.isD) {
    return (
      <nav className={drawerClasses}>
        <Link to="/">
          <div className="mobile-drawer-items" onClick={props.click}>
            <img className="mobile-drawer-logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div
          className="mobile-drawer-items mobile-drawer-login"
          style={{ borderBottom: 0, height: '45px', lineHeight: '50px' }}
        >
          반갑습니다 {props.userData.name}님
        </div>
        <div
          className="mobile-drawer-items mobile-drawer-login"
          style={{
            height: '40px',
            borderTop: 0,
            lineHeight: '30px',
            fontSize: '1.3rem'
          }}
        >
          보유 포인트 : {props.userData.point}
          point
        </div>
        <Link to="/userinfo">
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
            {/* // onClick=
            {() => alert('아직 이용할 수 없습니다.')} */}
            메세지
          </div>
        </Link>
        <div
          className="mobile-drawer-items mobile-drawer-gray"
          onClick={props.logout}
        >
          로그아웃
        </div>

        {/* 장막 */}
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
    if (props.userData.uid && props.userData.isAdmin) {
      return (
        <nav className={drawerClasses}>
          <Link to="/">
            <div className="mobile-drawer-items" onClick={props.click}>
              <img className="mobile-drawer-logo" src={logo} alt="logo" />
            </div>
          </Link>
          <div
            className="mobile-drawer-items mobile-drawer-login"
            style={{ backgroundColor: '#4c91ba' }}
          >
            반갑습니다 {props.userData.name}님
          </div>
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            onClick={props.logout}
          >
            로그아웃
          </div>
          <Link to="/admin/userlist">
            <div className="mobile-drawer-items" onClick={props.click}>
              유저 리스트
            </div>
          </Link>
          <Link to="/admin/designerlist">
            <div
              className="mobile-drawer-items"
              // onClick={() => alert('아직 이용할 수 없습니다.')}
              onClick={props.click}
            >
              디자이너 리스트
            </div>
          </Link>
          <Link to="/admin/waitinglist">
            <div className="mobile-drawer-items" onClick={props.click}>
              대기 디자이너
            </div>
          </Link>
          <Link to="/admin/reservationlist">
            <div className="mobile-drawer-items" onClick={props.click}>
              예약 리스트
            </div>
          </Link>
          <Link to="/admin/noshow">
            <div className="mobile-drawer-items" onClick={props.click}>
              노쇼 관리
            </div>
          </Link>
          <Link to="/admin/makecoupon">
            <div className="mobile-drawer-items" onClick={props.click}>
              쿠폰 발행
            </div>
          </Link>
          <Link to="/admin/qna">
            <div className="mobile-drawer-items" onClick={props.click}>
              QnA
            </div>
          </Link>
        </nav>
      );
    }
    return (
      <nav className={drawerClasses}>
        <Link to="/">
          <div className="mobile-drawer-items" onClick={props.click}>
            <img className="mobile-drawer-logo" src={logo} alt="logo" />
          </div>
        </Link>
        <div
          className="mobile-drawer-items mobile-drawer-login"
          style={{ backgroundColor: '#4c91ba' }}
        >
          반갑습니다 {props.userData.name}님
        </div>
        <Link to="/message">
          <div
            className="mobile-drawer-items mobile-drawer-gray"
            // onClick={() => alert('아직 이용할 수 없습니다.')}
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
          <div
            className="mobile-drawer-items"
            // onClick={() => alert('아직 이용할 수 없습니다.')}
            onClick={props.click}
          >
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
            쿠폰함
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
            // onClick={() => alert('아직 이용할 수 없습니다.')}
          >
            예디찾기
          </div>
        </Link>
        <Link to="/whyDreamary">
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
