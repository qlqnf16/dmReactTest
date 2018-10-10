import React from 'react';

const ReservationDetail = props => (
  <div className="col-8 align-items-start border px-3">
    <div className="my-4">
      <h4>요청사항</h4>
      <div>{props.requirement}</div>
    </div>
    <div className="my-4">
      <h4>예상 시술 소요시간</h4>
      <div>{props.requireTime}</div>
    </div>
  </div>
);

export default ReservationDetail;
