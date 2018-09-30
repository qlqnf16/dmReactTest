import React from 'react';

const TicketList = props => {
  const tickets = props.tickets.map(ticket => (
    <tr key={ticket.purchasedAt}>
      <td>{ticket.price === 10000 ? '1개월 이용권' : '3개월 이용권'}</td>
      <td>{ticket.purchasedAt}</td>
      <td>{ticket.price}</td>
      <td>언제부터 ~ 언제까지</td>
      <td>{ticket.expiredAt ? '사용중' : '만료'}</td>
    </tr>
  ));

  return <tbody>{tickets}</tbody>;
};

export default TicketList;
