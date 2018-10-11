import React from 'react';
import './ReservationDetail.css';

const ReservationDetail = props => (
  <div className="col-7 rd_back">
    <div className="rd_title">요청사항</div>
    <div className="rd_content">{props.requirement}</div>
    <div className="rd_title">예상 시술 소요시간</div>
    <div className="rd_content">{props.requireTime}</div>
  </div>
);

export default ReservationDetail;
