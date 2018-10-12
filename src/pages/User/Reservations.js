import React, { Component } from 'react';
import axios from 'axios';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import ReservationCards from '../../components/UserReservation/ReservationCards/ReservationCards';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import ReviewModal from '../../components/UI/ReservationModals/ReviewModal';
import { connect } from 'react-redux';
import './UserCss.css';

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      madeRequest: false,
      cancelModal: false,
      reviewModal: false,
      reservationId: null
    };
    this.cancelModalToggle = this.cancelModalToggle.bind(this);
    this.reviewModalToggle = this.reviewModalToggle.bind(this);
  }

  reviewModalToggle = reservationId => {
    this.setState({
      reviewModal: !this.state.reviewModal,
      reservationId
    });
  };
  cancelModalToggle = () => {
    this.setState({
      cancelModal: !this.state.cancelModal
    });
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${
          this.props.userData._id
        }/reservations`
      );
      this.setState({
        reservations: data,
        madeRequest: true
      });
    }
  };
  // TODO : 예약 취소 모달 후 '취소하시겠습니까' 묻는 과정 추가
  cancelReservationHandler = async reservationId => {
    console.log(reservationId);
    // const users = (await axios.get(`http://52.79.227.227:3030/users`)).data;
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/reservations/${reservationId}`,
      {
        isCanceled: true
      }
    );
    const { data } = await axios.get(
      `http://52.79.227.227:3030/users/${
        this.this.props.userData._id
      }/reservations`
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
      <div className="container-fluid u">
        <div className="d-flex">
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
          reservationId={this.state.reservationId}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Reservations);
