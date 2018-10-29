import React from 'react';
import TicketList from './TicketList/TicketList';
import spch_bubble_ticket from '../../../../assets/images/spch_bubble_ticket.png';
import './TicketBox.css';
const TicketBox = props => (
  <div
    className="col-8 table text-center ticket_box_back"
    style={{
      backgroundImage: `url(${spch_bubble_ticket})`,
      transform: 'translateX(-13px)'
    }}
  >
    <div className="ticket_box_table">
      <div className="ticket_box_table_header text-center row">
        <div className="col-2">종류</div>
        <div className="col-3">결제일</div>
        <div className="col-2">결제금액</div>
        <div className="col-3">이용권기간</div>
        <div className="col-2">상태</div>
      </div>
      <div className="ticket_box_table_body">
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
        <TicketList
          tickets={props.tickets}
          ticketActivate={props.ticketActivate}
        />
      </div>
    </div>
  </div>
);

export default TicketBox;
