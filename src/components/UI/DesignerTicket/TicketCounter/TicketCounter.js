import React from 'react';
import './TicketCounter.css';
import Ticket from '../../../../assets/images/ticket.png';

const TicketCounter = props => (
  <div className="tc_box">
    <img src={Ticket} className="tc_ticket" />
    <p className="tc_text">1개월 이용권</p>
    <div className="tc_number">2018/10/01~ 2018/10/31</div>
  </div>
);

export default TicketCounter;
