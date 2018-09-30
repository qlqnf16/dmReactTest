import React from 'react';

const TicketCounter = props => (
  <div className="border">
    <h5> 보유 이용권</h5>
    {/* <img /> 티켓이미지 */}
    <span>{props.count}개</span>
  </div>
);

export default TicketCounter;
