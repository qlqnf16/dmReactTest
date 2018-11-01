import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import AdminNav from '../../components/Navigation/AdminNav/AdminNav';

class DesignerList extends Component {
  state = {
    reservations: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/5bc213a5f4376e579d2c18f6/reservations/all`
      );
      this.setState({
        reservations: data,
        madeRequest: true
      });
    }
  };

  render() {
    if (this.state.madeRequest) {
      const reservations = this.state.reservations.map((reservation, key) => (
        <tr key={key}>
          <td>{Object.keys(reservation.services)}</td>
          <td>{reservation._designer.name}</td>
          <td>{reservation._user.name}</td>
          <td>
            <Moment format="YYYY/MM/DD">{reservation.createdAt}</Moment>{' '}
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{reservation.date}</Moment>
          </td>
          <td>
            {!reservation.isCanceled
              ? reservation.isDone
                ? '완료'
                : '예약중'
              : '취소'}
          </td>
        </tr>
      ));
      return (
        <div>
          <AdminNav />
          <h1>디자이너 관리</h1>
          <table className="table text-center">
            <thead>
              <tr>
                <th>서비스 종류</th>
                <th>예비 디자이너</th>
                <th>일반 회원</th>
                <th>예약 체결일</th>
                <th>예약일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>{reservations}</tbody>
          </table>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default DesignerList;
