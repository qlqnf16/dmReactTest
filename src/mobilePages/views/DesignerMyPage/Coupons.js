import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import { connect } from 'react-redux';
import firebase from '../../../config/Firebase';
import CouponContent from '../../components/Coupon/CouponContent';
import axios from '../../../config/Axios';

class DesignerCoupon extends Component {
  inputChangeHandler = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  couponSubmit = async () => {
    try {
      await axios.patch(`coupons/${this.state.coupon}`, {
        _user: this.props.userData._id,
        isD: this.props.userData.isD
      });
      alert('쿠폰이 적용 되었습니다.');
    } catch (err) {
      alert('유효하지 않은 쿠폰번호 입니다.');
    }
  };
  render() {
    return (
      <div>
        <DesignerNav />
        <div className="m_containerStyle">
          <div style={containerStyle}>
            {/* <div style={titleStyle}>프로모션</div>
            <div style={subtitleStyle}>프로모션 코드/포인트 적립</div>
            <div>
              <div style={labelStyle}>프로모션 코드 입력</div>
              <div>
                <input
                  style={inputTextStyle}
                  onChange={e => this.inputChangeHandler(e)}
                  type="text"
                  name="coupon"
                  id="coupon"
                />
                <div style={buttonStyle} onClick={() => this.couponSubmit()}>
                  포인트 적립
                </div>
              </div>
            </div> */}
            <div>
              <div style={labelStyle} className="mb-3">
                추천인 코드
              </div>
              <div>
                <CouponContent
                  couponNumber={firebase.auth().currentUser.uid}
                  isD={true}
                  recommendationNum={this.props.userData.designerRecommendation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  labelStyle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1e3354',
    marginTop: '1.5rem',
    marginBottom: '0.2rem'
  }
};

const { containerStyle, labelStyle } = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerCoupon);
