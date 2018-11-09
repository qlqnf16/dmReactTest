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
        ticketState = (
          <div
            className="col-12 border p-3 text-center"
            style={{
              backgroundColor: 'rgb(31, 51, 84)',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            사용중
          </div>
        );
      else
        ticketState = (
          <div
            className="col-12 border p-3 text-center"
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            만료
          </div>
        );
    } else {
      ticketPeriod = <div />;
      ticketState = (
        <div
          className="col-12 border p-3 text-center"
          key={key}
          onClick={() => props.ticketActivate(ticket._id)}
          style={{
            cursor: 'pointer',
            backgroundColor: '#66ce82',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}
        >
          사용하기
        </div>
      );
    }
    return (
      <div className="row" key={ticket.purchasedAt} style={containerStyle}>
        <div className="col-4 border p-3 font-weight-bold">종류</div>
        <div className="col-8 border p-3">
          {ticket.price === 10000 ? '1개월 이용권' : '3개월 이용권'}
        </div>
        <div className="col-4 border p-3 font-weight-bold">결제일</div>
        <div className="col-8 border p-3">
          <Moment format="YYYY/MM/DD">{ticket.createdAt}</Moment>
        </div>
        <div className="col-4 border p-3 font-weight-bold">결제금액</div>
        <div className="col-8 border p-3">{ticket.price}원</div>
        <div className="col-4 border p-3 font-weight-bold">이용권기간</div>
        <div className="col-8 border p-3">{ticketPeriod}</div>
        {ticketState}
      </div>
    );
  });

  return <React.Fragment>{tickets}</React.Fragment>;
};

const styles = {
  containerStyle: {
    padding: '5% 9%'
  }
};

const { containerStyle } = styles;

export default TicketList;
