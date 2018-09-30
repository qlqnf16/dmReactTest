import React from 'react';

const TicketPurchaseButton = props => (
  <div className="row mt-5">
    <div className="col-6">
      {/* <img /> 티켓 이미지 필요 */}
      <div>1회 이용권</div>
      <div>3000원</div>
      <button onClick={() => props.purchase(3000)} className="btn btn-light">
        <span className="small">이용권 구매</span>
      </button>
    </div>
    <div className="col-6">
      {/* <img /> 티켓 이미지 필요 */}
      <div>2회 이용권</div>
      <div>5000원</div>
      <button onClick={() => props.purchase(5000)} className="btn btn-light">
        <span className="small">이용권 구매</span>
      </button>
    </div>
  </div>
);

export default TicketPurchaseButton;
