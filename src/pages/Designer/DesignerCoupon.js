import React, { Component } from 'react';
import firebase from '../../config/Firebase';

class DesignerCoupon extends Component {
  render() {
    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <h1 className="mt-5">추천인/쿠폰</h1>
            <h3>{firebase.auth().currentUser.uid}</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default DesignerCoupon;
