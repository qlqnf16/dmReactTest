import React, { Component, Fragment } from 'react';
import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';

class Coupon extends Component {
  render() {
    const { containerStyle } = styles;
    return (
      <Fragment>
        <MyPageNavigationBar />
        <div className="m_containerStyle">
          <div style={containerStyle}>
            <div>추천인/쿠폰</div>
            <div>친구야, 머리 자를 때 되지 않았니?</div>
            <div>
              친구 추천하고
              <br />
              쿠폰 받자!
            </div>
            <div>
              친구 3명 가입 시 무료이용권 1개 지급!
              <br />
              가입 시 추천인 코드란에 아래의 프로모션 코드를
              <br />
              기입해달라고 부탁하세요!
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  }
};

export default Coupon;
