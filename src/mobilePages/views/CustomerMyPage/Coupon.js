import React, { Component } from 'react';
import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';
import firebase from '../../../config/Firebase';
import axios from '../../../config/Axios';
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
      <div>
        <MyPageNavigationBar />
        <div className="m_containerStyle">
          <div style={containerStyle}>
            <div style={titleStyle}>쿠폰함</div>
            <div style={subtitleStyle}>쿠폰 코드/포인트 적립</div>
            <div>
              <div style={labelStyle}>쿠폰 코드 입력</div>
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
            </div>
            {/* <div>
              <div style={labelStyle}>추천인 코드</div>
              <div>
                <CouponContent
                  couponNumber={firebase.auth().currentUser.uid}
                  recommendationNum={this.props.userData.recommendation}
                />
              </div>
            </div> */}
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
  },
  inputTextStyle: {
    fontSize: '1.3rem',
    color: '#1f3354',
    padding: '0.7rem',
    borderRadius: '5px',
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    width: '66.7%'
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#dd6866',
    textAlign: 'left',
    margin: '33.5px 0',
    paddingBottom: 6.9,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354'
  },
  buttonStyle: {
    display: 'inline-block',
    marginLeft: '3.3%',
    padding: '2.3%',
    width: '30%',
    border: '1px solid #dd6866',
    backgroundColor: '#dd6866',
    borderRadius: '5px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center'
  }
};

const {
  containerStyle,
  labelStyle,
  inputTextStyle,
  titleStyle,
  subtitleStyle,
  buttonStyle
} = styles;

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(
  mapStateToProps,
  actions
)(Coupon);
