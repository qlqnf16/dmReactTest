import React from 'react';

const TicketList = props => {
  const tickets = props.tickets.map(ticket => (
    <div className="ticket_box_row" key={ticket.purchasedAt}>
      <div className="row ticket_box_row_header">
        <div className="col-2 ticket_box_line p-0">
          {ticket.price === 10000 ? '1개월 이용권' : '3개월 이용권'}
        </div>
        {/* <div className="col-3">{ticket.purchasedAt}</div> */}
        <div className="col-3 ticket_box_line">
          <div>2018/09/27</div>
        </div>
        <div className="col-2 ticket_box_line item-align-center">
          <div>{ticket.price}원</div>
        </div>
        <div className="col-3">
          <div>2018/10/01~ 2018/10/31</div>
        </div>
        <div className="col-2 ticket_box_line">
          <div>{ticket.expiredAt ? '사용중' : '만료'}</div>
        </div>
      </div>
    </div>
  ));

  return <React.Fragment>{tickets}</React.Fragment>;
};

export default TicketList;
