import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';

class Coupon extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <UserNav />
          <div className="col-10">
            <h1>{firebase.auth().currentUser.uid}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Coupon;
