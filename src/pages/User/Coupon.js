import React, { Component } from 'react';
import firebase from 'firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class Coupon extends Component {
  render() {
    console.log('adsf');
    console.log(this.props.userData[0]);

    return (
      <div className="container">
        <div className="row mt-5">
          <UserNav />
          <div className="col-10">
            <h1>{firebase.auth().currentUser.uid}</h1>
            <h1>{this.props.userData.uid}</h1>
            <div className="btn">바꿔</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userData: state.userData };
};

const mapDispatchToProps = dispatch => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coupon);
