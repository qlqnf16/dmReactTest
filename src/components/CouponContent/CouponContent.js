import React from 'react';
import './CouponContent.css';
import ticket from '../../assets/images/ticket.png';

const CouponContent = props => {
  let title = '';
  let content = '';
  if (props.isD) {
    title = '친구야, 아직도 인스타에서 모델 구해?';
    content = '예비 디자이너 친구 2명 가입시 한달이용권 1개 지급!';
  } else {
    title = '친구야, 머리 자를 때 되지 않았니?';
    content = '친구 3명 가입시 3000포인트 지급!';
  }
  return (
    <div className={props.isD ? 'cc_bg_designer' : 'cc_bg'}>
      <div className="cc_1">{title}</div>
      <div className="cc_2">
        친구 추천하고 <strong>쿠폰 받자!</strong>
      </div>
      <div className="cc_3">
        {content} <br />
        가입 시 추천인 코드란에 아래의 프로모션 코드를 기입해달라고 부탁하세요!
      </div>
      <div>
        <img alt="alt" className="cc_ticket" src={ticket} />
        <div className="cc_num">{props.couponNumber}</div>
      </div>
    </div>
  );
};
export default CouponContent;
