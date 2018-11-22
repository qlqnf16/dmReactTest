import React, { Component } from "react";
import axios from "../../config/Axios";
import Moment from "react-moment";
import AdminNav from "../../components/Navigation/AdminNav/AdminNav";

class DesignerList extends Component {
  state = {
    reservations: [],
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      let { data } = await axios.get(
        `users/5bc213a5f4376e579d2c18f6/reservations/all`
      );
      data = data.sort((a, b) => b.createdAt - a.createdAt);
      this.setState({
        reservations: data,
        madeRequest: true
      });
    }
  };

  reservationSortHandler = async () => {
    let { data } = await axios.get(
      `users/5bc213a5f4376e579d2c18f6/reservations/all`
    );
    data = data.sort((a, b) => a.createdAt - b.createdAt);
    this.setState({
      reservations: data,
      madeRequest: true
    });
  };

  render() {
    if (this.state.madeRequest) {
      const reservations = this.state.reservations.map((reservation, key) => (
        <tr key={key}>
          <td>{Object.keys(reservation.services)}</td>
          <td>
            <div>{reservation._designer.name}</div>
            <div>{reservation._designer._id}</div>
          </td>
          <td>
            <div>{reservation._user.name}</div>
            <div>{reservation._user._id}</div>
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{reservation.createdAt}</Moment>{" "}
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{reservation.date}</Moment>
          </td>
          <td>
            {`${Math.floor(reservation.time.since / 60)}:${reservation.time
              .since % 60} ~ ${Math.floor(
              reservation.time.until / 60
            )}:${reservation.time.until % 60}`}
          </td>
          <td>{reservation._card && reservation._card.fullAddress}</td>
          <td>{reservation._card && reservation._card.shop}</td>
          <td>
            {!reservation.isCanceled
              ? reservation.isDone
                ? "완료"
                : "예약중"
              : "취소"}
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
                <th onClick={this.reservationSortHandler}>예약 체결일</th>
                <th>예약일</th>
                <th>예약일시</th>
                <th>주소</th>
                <th>샵</th>
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
