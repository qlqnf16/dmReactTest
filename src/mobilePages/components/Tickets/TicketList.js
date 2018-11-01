import React from 'react';
import Moment from 'react-moment';

const TicketList = props => {
  const tickets = props.tickets.map((ticket, key) => {
    let ticketState;
    let ticketPeriod;
    if (ticket.activatedAt) {
      ticketPeriod = (
        <div key={key}>
          <Moment format="YYYY/MM/DD">{ticket.activatedAt}</Moment> ~
          <Moment format="YYYY/MM/DD">{ticket.expiredAt}</Moment>
        </div>
      );
      if (ticket.expiredAt > new Date().getTime())
        ticketState = <div>사용중</div>;
      else ticketState = <div>만료</div>;
    } else {
      ticketPeriod = <div />;
      ticketState = (
        <div
          key={key}
          onClick={() => props.ticketActivate(ticket._id)}
          style={{ cursor: 'pointer' }}
        >
          사용하기
        </div>
      );
    }
    return (
      <div className="d-flex" key={ticket.purchasedAt}>
        <div>{ticket.price === 10000 ? '1개월 이용권' : '3개월 이용권'}</div>
        <div>
          <Moment format="YYYY/MM/DD">{ticket.createdAt}</Moment>
        </div>
        <div>
          <div>{ticket.price}원</div>
        </div>
        <div>{ticketPeriod}</div>
        <div>{ticketState}</div>
      </div>
    );
  });

  return <React.Fragment>{tickets}</React.Fragment>;
};

export default TicketList;
