import React from 'react';
import './ReservationDetail.css';

const ReservationDetail = props => {
  const requireTime = props.requireTime.until - props.requireTime.since;
  let timeFormat = '';
  timeFormat +=
    Math.floor(requireTime / 60) === 0
      ? ''
      : `${Math.floor(requireTime / 60)}시간`;
  timeFormat += requireTime % 60 === 0 ? '' : `${requireTime % 60}분`;
  return (
    <div className="col-7 rd_back">
      <div className="rd_title">요청사항</div>
      <div className="rd_content">{props.requirement}</div>
      <div className="rd_title">예상 시술 소요시간</div>
      <div className="rd_content">{timeFormat}</div>
    </div>
  );
};
export default ReservationDetail;
