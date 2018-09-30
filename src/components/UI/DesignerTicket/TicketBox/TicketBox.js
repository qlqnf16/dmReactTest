import React from 'react';
import TicketList from './TicketList/TicketList';

const TicketBox = props => (
  <table className="m-3 table text-center">
    <thead>
      <th scope="col">종류</th>
      <th scope="col">결제일</th>
      <th scope="col">결제금액</th>
      <th scope="col">이용권기간</th>
      <th scope="col">상태</th>
    </thead>
    <TicketList tickets={props.tickets} />
  </table>
);

export default TicketBox;
