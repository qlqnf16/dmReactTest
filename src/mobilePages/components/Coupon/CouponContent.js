import React from 'react';
import d_coupon from '../../../assets/images/d_coupon.png';
import coupon from '../../../assets/images/coupon.png';

const CouponContent = props => {
  let title = '';
  let content = '';
  let numClass = '';
  let img;
  if (props.isD) {
    title = '친구야, 아직도 인스타에서 모델 구해?';
    content = '예비 디자이너 친구 2명 가입시 한달이용권 1개 지급!';
    numClass = 'cc_num d';
    img = d_coupon;
  } else {
    title = '친구야, 머리 자를 때 되지 않았니?';
    content = '친구 3명 가입시 3000포인트 지급!';
    numClass = 'cc_num';
    img = coupon;
  }
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={contentStyle}>
        친구 추천하고
        <br />
        <strong>포인트 받자!</strong>
      </div>
      <div style={descriptionStyle}>
        {content} <br />
        가입 시 추천인 코드란에 아래의 프로모션 코드를
        <br />
        기입해달라고 부탁하세요!
      </div>
      <div>
        <div style={{ backgroundImage: `url(${img})`, ...couponStyle }}>
          {props.couponNumber}
        </div>
      </div>
      <div style={{ fontSize: '1.1rem', marginTop: '1.7rem' }}>
        (내 추천으로 가입한 친구:{' '}
        {props.recommendationNum ? props.recommendationNum : 0}
        명)
      </div>
    </div>
  );
};

const styles = {
  containerStyle: {
    textAlign: 'center',
    padding: '3rem',
    borderRadius: 5,
    backgroundImage:
      'linear-gradient(151deg, #fffae3, #ffefe3 52%, #ffeee3 59%, #ffe8e3)',
    color: '#1f3354'
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  contentStyle: {
    margin: '2.5rem 0',
    fontSize: '3rem'
  },
  descriptionStyle: {
    fontSize: '1.2rem',
    marginBottom: '1.3rem'
  },
  couponStyle: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '6rem',
    lineHeight: '6rem',
    paddingTop: '0.7rem',
    fontWeight: 'bold',
    color: '#dd6866',
    fontSize: '1.2rem'
  }
};

const {
  containerStyle,
  titleStyle,
  contentStyle,
  descriptionStyle,
  couponStyle
} = styles;
export default CouponContent;
