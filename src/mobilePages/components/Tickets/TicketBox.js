import React from 'react';
import TicketList from './TicketList';
import spch_bubble_ticket from '../../../assets/images/spch_bubble_ticket.png';
const TicketBox = props => (
  <div>
    <div>
      <div>종류</div>
      <div>결제일</div>
      <div>결제금액</div>
      <div>이용권기간</div>
      <div>상태</div>
    </div>
    <div>
      <TicketList
        tickets={props.tickets}
        ticketActivate={props.ticketActivate}
      />
    </div>
  </div>
);

export default TicketBox;
