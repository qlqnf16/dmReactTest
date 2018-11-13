import React from 'react';
import TicketList from './TicketList';
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
