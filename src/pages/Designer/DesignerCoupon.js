import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import CouponContent from '../../components/CouponContent/CouponContent';
import { FormGroup } from 'reactstrap';
import axios from 'axios';

class DesignerCoupon extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  couponSubmit = async () => {
    console.log(this.state.coupon);

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
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div className="u_title" style={{ color: '#4c91ba' }}>
              추천인/쿠폰
            </div>
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
                <div
                  className=" coupon_button"
                  onClick={() => this.couponSubmit()}
                >
                  적용
                </div>
              </div>
            </FormGroup>
            <div className="uif_title d-flex">
              추천인 코드{' '}
              <span className="mr-5 ml-auto">
                내 추천으로 가입한 예디 :{' '}
                {this.props.userData.designerRecommendation}명
              </span>
            </div>
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
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerCoupon);
