import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import axios from '../../config/Axios';
import { withRouter } from 'react-router-dom';
import * as actions from '../../modules';
import { connect } from 'react-redux';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import CouponContent from '../../components/CouponContent/CouponContent';

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
      } = await axios.patch(`coupons/${this.state.coupon}`, {
        _user: this.props.userData._id,
        isD: false
      });
      await this.props.updateRedux('point', point);
      alert('쿠폰이 적용 되었습니다.');
    } catch (err) {
      alert('유효하지 않은 쿠폰번호 입니다.');
    }
  };
  render() {
    return (
      <div className="container-fluid u">
        <div className="d-flex" style={{ minHeight: '70vh' }}>
          <UserNav />
          <div className="u_bg">
            <div className="u_container">
              <div className="u_title">프로모션</div>
              <div className="uif_title ">프로모션 코드/포인트 적립</div>
              <div className="row" style={{ marginTop: '3rem' }}>
                <div className="col-2 if_head uif_head ">
                  프로모션 코드 입력
                </div>
                <div className="col-8 d-flex justify-content-left">
                  <input
                    onChange={e => this.inputChangeHandler(e)}
                    type="text"
                    name="coupon"
                    id="coupon"
                    className="if_input"
                  />
                  <div
                    className="coupon_button"
                    style={{ border: 'solid 1px #dd6866', color: '#dd6866' }}
                    onClick={() => this.couponSubmit()}
                  >
                    포인트 적립
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: '4.4rem' }}>
                <div className="col-2 if_head uif_head">추천인 코드</div>
                <div className="col-8">
                  <CouponContent
                    couponNumber={firebase.auth().currentUser.uid}
                    recommendationNum={this.props.userData.recommendation}
                  />
                </div>
              </div>
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
export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(Coupon)
);
