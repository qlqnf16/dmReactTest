import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import CouponContent from '../../components/CouponContent/CouponContent';
class DesignerCoupon extends Component {
  render() {
    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div className="u_title">추천인/쿠폰</div>
            <CouponContent
              couponNumber={firebase.auth().currentUser.uid}
              isD={true}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default DesignerCoupon;
