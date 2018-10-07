import React, { Component } from 'react';
import axios from 'axios';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import ReservationCards from '../../components/UserReservation/ReservationCards/ReservationCards';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import ReviewModal from '../../components/UI/ReservationModals/ReviewModal';

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      madeRequest: false,
      cancelModal: false,
      reviewModal: false
    };

    this.cancelModalToggle = this.cancelModalToggle.bind(this);
    this.reviewModalToggle = this.reviewModalToggle.bind(this);
  }

  reviewModalToggle() {
    this.setState({
      reviewModal: !this.state.reviewModal
    });
  }
  cancelModalToggle() {
    this.setState({
      cancelModal: !this.state.cancelModal
    });
  }

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      // 일단은 더미유저 아이디를 가져와서 사용. 이후 현재 로그인 유저의 아이디로 요청을 보내면 됨.
      const users = (await axios.get(`http://52.79.227.227:3030/users`)).data;
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${users[0]._id}/reservations/all`
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
    let futureReservations = [];
    let previousReservations = [];
    if (this.state.reservations) {
      futureReservations = this.state.reservations.filter(
        reservation =>
          reservation.date > new Date().getTime() && !reservation.isCanceled
      );
      previousReservations = this.state.reservations.filter(
        reservation =>
          reservation.date <= new Date().getTime() || reservation.isCanceled
      );
    }

    return (
      <div className="container">
        <div className="row mt-5">
          <UserNav />
          <ReservationCards
            futureReservations={futureReservations}
            previousReservations={previousReservations}
            cancelHandler={this.cancelReservationHandler}
            cancelModalToggle={this.cancelModalToggle}
            reviewModalToggle={this.reviewModalToggle}
          />
        </div>
        <CancelReasonModal
          isOpen={this.state.cancelModal}
          toggle={this.cancelModalToggle}
        />
        <ReviewModal
          isOpen={this.state.reviewModal}
          toggle={this.reviewModalToggle}
        />
      </div>
    );
  }
}

export default Reservations;
