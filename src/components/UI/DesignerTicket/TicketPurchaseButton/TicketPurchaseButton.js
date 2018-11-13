import React from 'react';
import Ticket from '../../../../assets/images/ticket.png';
import './TicketPurchaseButton.css';
const TicketPurchaseButton = props => (
  <div className="row tc_button">
    <div className="col-6">
      <img src={Ticket} className="tc_ticket" alt="Ticket" />
      <div className="tc_number">1개월 이용권</div>
      <div className="tc_text">10,000원</div>
      <div
        onClick={() => props.purchaseHandler(10000)}
        className="tc_button_purchase btn"
      >
        이용권 구매
      </div>
    </div>
    <div className="col-6">
      <img src={Ticket} className="tc_ticket" alt="Ticket" />
      <div className="tc_number">3개월 이용권</div>
      <div className="tc_text">28,000원</div>
      <div
        onClick={() => props.purchaseHandler(28000)}
        className="tc_button_purchase btn"
      >
        이용권 구매
      </div>
    </div>
  </div>
);

export default TicketPurchaseButton;
