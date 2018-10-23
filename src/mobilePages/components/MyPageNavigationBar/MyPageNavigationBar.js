import React, { Component } from 'react';
import MyPageHeader from './MyPageHeader';
import MyPageNavigationItems from './MyPageNavigationItems';
import './MyPageNavigationBar.css';

class MyPageNavigationBar extends Component {
  render() {
    return (
      <div>
        <MyPageHeader />
        <div className="mobile-sub-menu">
          {/* todo: 해당 페이지에 있을 때 active property를 적용하게 하기 */}
          {/* todo: 메뉴 아이템마다 라우터 링크 추가하기 */}
          <MyPageNavigationItems active>예약관리</MyPageNavigationItems>
          <MyPageNavigationItems>찜한막내</MyPageNavigationItems>
          <MyPageNavigationItems>이용권관리</MyPageNavigationItems>
          <MyPageNavigationItems>회원정보관리</MyPageNavigationItems>
          <MyPageNavigationItems>추천인/쿠폰</MyPageNavigationItems>
        </div>
      </div>
    );
  }
}

export default MyPageNavigationBar;
