import React, { Component } from 'react';
import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';
import firebase from '../../../config/Firebase';
import axios from 'axios';
import * as actions from '../../../modules';

import { connect } from 'react-redux';
import CouponContent from '../../components/Coupon/CouponContent';

class Coupon extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  couponSubmit = async () => {
    try {
      const {
        data: { point }
      } = await axios.patch(
        `http://52.79.227.227:3030/coupons/${this.state.coupon}`,
        {
          _user: this.props.userData._id,
          isD: false
        }
      );
      await this.props.updateRedux('point', point);
      alert('쿠폰이 적용 되었습니다.');
    } catch (err) {
      alert('유효하지 않은 쿠폰번호 입니다.');
    }
  };
  render() {
    return (
      <div>
        <MyPageNavigationBar />
        <div>
          <div>프로모션</div>
          <div>프로모션 코드/포인트 적립</div>
          <div>
            <div>프로모션 코드 입력</div>
            <div>
              <input
                onChange={e => this.inputChangeHandler(e)}
                type="text"
                name="coupon"
                id="coupon"
              />
              <div onClick={() => this.couponSubmit()}>포인트 적립</div>
            </div>
          </div>
          <div>
            <div>추천인 코드</div>
            <div>
              <CouponContent
                couponNumber={firebase.auth().currentUser.uid}
                recommendationNum={this.props.userData.recommendation}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(
  mapStateToProps,
  actions
)(Coupon);
