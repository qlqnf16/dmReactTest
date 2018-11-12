import React from 'react';
import Moment from 'react-moment';

const TicketList = props => {
  const tickets = props.tickets.map((ticket, key) => {
    let ticketState;
    let ticketPeriod;
    if (ticket.activatedAt) {
      ticketPeriod = (
        <div key={key}>
          (<Moment format="YYYY/MM/DD">{ticket.activatedAt}</Moment> ~
          <Moment format="YYYY/MM/DD">{ticket.expiredAt}</Moment>)
        </div>
      );
      if (ticket.expiredAt > new Date().getTime())
        ticketState = (
          <div
            className="col-12 border py-4 text-center"
            style={{
              backgroundColor: '#4c91ba',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginTop: '0.7rem'
            }}
          >
            사용중 
            {ticketPeriod}
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
        <div className="col-4 border p-3 font-weight-bold" style={tableStyle}>종류</div>
        <div className="col-8 border p-3" style={tableStyle}>
          {ticket.price === 10000 ? '1개월 이용권' : '3개월 이용권'}
        </div>
        <div className="col-4 border p-3 font-weight-bold" style={tableStyle}>결제일</div>
        <div className="col-8 border p-3" style={tableStyle}>
          <Moment format="YYYY/MM/DD">{ticket.createdAt}</Moment>
        </div>
        <div className="col-4 border p-3 font-weight-bold" style={tableStyle}>결제금액</div>
        <div className="col-8 border p-3" style={tableStyle}>{ticket.price}원</div>
        {ticketState}
      </div>
    );
  });

  return <React.Fragment>{tickets}</React.Fragment>;
};

const styles = {
  containerStyle: {
    padding: '0 9%',
    fontSize: '1.2rem'
  },
  tableStyle: {
    marginBottom: '-1px',
    marginRight: '-1px'
  }
};

const { containerStyle, tableStyle } = styles;

export default TicketList;
