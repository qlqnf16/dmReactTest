import React, { Component } from "react";
import MyPageHeader from "./MyPageHeader";
import MyPageNavigationItems from "./MyPageNavigationItems";
import "./MyPageNavigationBar.css";
import { Link } from "react-router-dom";

class MyPageNavigationBar extends Component {
  render() {
    return (
      <div>
        <MyPageHeader />
        <div className="mobile-sub-menu">
          {/* todo: 해당 페이지에 있을 때 active property를 적용하게 하기 */}
          <Link to="/reservations">
            <MyPageNavigationItems active>예약관리</MyPageNavigationItems>
          </Link>
          <Link to="/likedesigner">
            <MyPageNavigationItems>찜한예디</MyPageNavigationItems>
          </Link>
          <Link to="userInfo">
            <MyPageNavigationItems>회원정보관리</MyPageNavigationItems>
          </Link>
          <Link to="coupon">
            <MyPageNavigationItems>추천인/쿠폰</MyPageNavigationItems>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyPageNavigationBar;
