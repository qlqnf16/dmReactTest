import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import CouponContent from '../../components/CouponContent/CouponContent';
import { FormGroup } from 'reactstrap';

class Coupon extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  couponSubmit = () => {
    console.log(this.state.coupon);
  };
  render() {
    return (
      <div className="container-fluid u">
        <div className="d-flex" style={{ minHeight: '70vh' }}>
          <UserNav />
          <div className="u_bg">
            <div className="u_container">
              <div className="u_title">추천인/쿠폰</div>
              <div className="uif_title ">쿠폰 입력</div>
              <FormGroup row>
                <div className="col-2 if_head uif_head ">쿠폰 입력</div>
                <div className="col-8 d-flex justify-content-left">
                  <input
                    onChange={e => this.inputChangeHandler(e)}
                    type="text"
                    name="coupon"
                    id="coupon"
                    className="if_input"
                  />
                  <div className="btn" onClick={() => this.couponSubmit()}>
                    적용
                  </div>
                </div>
              </FormGroup>

              <div className="uif_title">추천인 코드</div>
              <CouponContent couponNumber={firebase.auth().currentUser.uid} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Coupon;
