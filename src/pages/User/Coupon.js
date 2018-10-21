import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import CouponContent from '../../components/CouponContent/CouponContent';

class Coupon extends Component {
  render() {
    return (
      <div className="container-fluid u">
        <div className="d-flex" style={{ minHeight: '70vh' }}>
          <UserNav />
          <div className="u_bg">
            <div className="u_container">
              <div className="u_title">추천인/쿠폰</div>
              <CouponContent couponNumber={firebase.auth().currentUser.uid} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Coupon;
