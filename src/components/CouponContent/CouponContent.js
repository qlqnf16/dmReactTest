import React from 'react';
import './CouponContent.css';
import d_coupon from '../../assets/images/d_coupon.png';
import coupon from '../../assets/images/coupon.png';

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
    <div className={props.isD ? 'cc_bg_designer' : 'cc_bg'}>
      <div className="cc_1">{title}</div>
      <div className="cc_2">
        <strong>친구 추천하고 포인트 받자!</strong>
      </div>
      <div className="cc_3">
        {content} <br />
        가입 후 마이페이지 > 회원정보관리에 아래의 프로모션 코드를 기입해달라고
        부탁하세요!
      </div>
      <div>
        <img alt="alt" className="cc_coupon" src={img} />
        <div className={numClass}>{props.couponNumber}</div>
      </div>
      <div style={{ fontSize: '1.3rem' }}>
        내 추천으로 가입한 친구:{' '}
        {props.recommendationNum ? props.recommendationNum : 0}명
      </div>
    </div>
  );
};
export default CouponContent;
