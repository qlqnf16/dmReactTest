import React from 'react';
import TicketList from './TicketList';
import spch_bubble_ticket from '../../../assets/images/spch_bubble_ticket.png';
const TicketBox = props => (
  <div>
    <div>
      <TicketList
        tickets={props.tickets}
        ticketActivate={props.ticketActivate}
      />
    </div>
  </div>
);

export default TicketBox;
