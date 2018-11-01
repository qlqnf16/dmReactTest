import React from 'react';
import Ticket from '../../../assets/images/ticket.png';
const TicketPurchaseButton = props => (
  <div>
    <div>
      <img src={Ticket} className="tc_ticket" />
      <div>1개월 이용권</div>
      <div>10000원</div>
      <div onClick={() => props.purchaseHandler(10000)}>이용권 구매</div>
    </div>
    <div>
      <img src={Ticket} className="tc_ticket" />
      <div>3개월 이용권</div>
      <div>28,000원</div>
      <div onClick={() => props.purchaseHandler(28000)}>이용권 구매</div>
    </div>
  </div>
);

export default TicketPurchaseButton;
