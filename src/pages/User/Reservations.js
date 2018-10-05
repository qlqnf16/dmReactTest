import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import ReservationCards from '../../components/UserReservation/ReservationCards/ReservationCards';

class Reservations extends Component {
  state = {
    reservations: null,
    madeRequest: false
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      // 일단은 더미유저 아이디를 가져와서 사용. 이후 현재 로그인 유저의 아이디로 요청을 보내면 됨.
      const users = (await axios.get(`http://52.79.227.227:3030/users`)).data;
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${users[0]._id}/reservations`
      );
      this.setState({
        reservations: data,
        madeRequest: true
      });
    }
  };

  cancelReservationHandler = async reservationId => {
    console.log(reservationId);
    const users = (await axios.get(`http://52.79.227.227:3030/users`)).data;
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        users[0]._id
      }/reservations/${reservationId}`
    );
    const { data } = await axios.get(
      `http://52.79.227.227:3030/users/${users[0]._id}/reservations`
    );
    this.setState({
      reservations: data,
      madeRequest: true
    });
  };

  render() {
    console.log(this.state);
    let futureReservations = [];
    let previousReservations = [];
    if (this.state.reservations) {
      futureReservations = this.state.reservations.filter(
        reservation =>
          reservation.date > new Date().getHours(6, 0, 0, 0) &&
          !reservation.isCanceled
      ); // 실제로는 현재 타임스탬프 사용
      previousReservations = this.state.reservations.filter(
        reservation =>
          reservation.date <= new Date().getHours(6, 0, 0, 0) ||
          reservation.isCanceled
      );
    }

    return (
      <div className="container">
        <div className="row">
          <UserNav />
          <ReservationCards
            futureReservations={futureReservations}
            previousReservations={previousReservations}
            cancelHandler={this.cancelReservationHandler}
          />
        </div>
      </div>
    );
  }
}

export default Reservations;
