import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import { connect } from 'react-redux';
import firebase from '../../../config/Firebase';
import CouponContent from '../../components/Coupon/CouponContent';
import axios from 'axios';

class DesignerCoupon extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  couponSubmit = async () => {
    try {
      await axios.patch(
        `http://52.79.227.227:3030/coupons/${this.state.coupon}`,
        {
          _user: this.props.userData._id,
          isD: this.props.userData.isD
        }
      );
      alert('쿠폰이 적용 되었습니다.');
    } catch (err) {
      alert('유효하지 않은 쿠폰번호 입니다.');
    }
  };
  render() {
    return (
      <div>
        <DesignerNav />
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
            <div onClick={() => this.couponSubmit()}>적용</div>
          </div>
        </div>
        <div>
          <div>추천인 코드</div>
          <div>
            <CouponContent
              couponNumber={firebase.auth().currentUser.uid}
              isD={true}
              recommendationNum={this.props.userData.designerRecommendation}
            />{' '}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerCoupon);
