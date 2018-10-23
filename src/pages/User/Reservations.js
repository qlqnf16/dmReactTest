import React, { Component } from 'react';
import axios from 'axios';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import ReservationCards from '../../components/UserReservation/ReservationCards/ReservationCards';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import CancelModal from '../../components/UI/ReservationModals/CancelModal';
import ReviewModal from '../../components/UI/ReservationModals/ReviewModal';
import { connect } from 'react-redux';
import './UserCss.css';
import ShowReviewModal from '../../components/UI/ReservationModals/ShowReviewModal';

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      madeRequest: false,
      cancelReasonModal: false,
      cancelModal: false,
      reviewModal: false,
      showReviewModal: false,
      reservation: null
    };
    this.cancelReasonModalToggle = this.cancelReasonModalToggle.bind(this);
    this.reviewModalToggle = this.reviewModalToggle.bind(this);
  }

  reviewModalToggle = reservation => {
    this.setState({
      reviewModal: !this.state.reviewModal,
      reservation
    });
  };
  cancelReasonModalToggle = reservation => {
    this.setState({
      cancelReasonModal: !this.state.cancelReasonModal,
      reservation
    });
  };
  cancelModalToggle = reservation => {
    this.setState({
      cancelModal: !this.state.cancelModal,
      reservation
    });
  };

  showReviewModalToggle = reservation => {
    this.setState({
      showReviewModal: !this.state.showReviewModal,
      reservation
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

  reloadData = async () => {
    const { data } = await axios.get(
      `http://52.79.227.227:3030/users/${this.props.userData._id}/reservations`
    );
    this.setState({
      reservations: data,
      madeRequest: true
    });
  };

  reservationSort = (r1, r2) => r1.date - r2.date;

  render() {
    let futureReservations = [];
    let previousReservations = [];
    if (this.state.reservations) {
      futureReservations = this.state.reservations.filter(
        reservation =>
          reservation.date > new Date().getTime() &&
          !reservation.isCanceled &&
          !reservation.isDone
      );
      futureReservations.sort(this.reservationSort);
      previousReservations = this.state.reservations.filter(
        reservation =>
          reservation.date <= new Date().getTime() || reservation.isCanceled
      );
      previousReservations.sort(this.reservationSort);
    }

    return (
      <div className="container-fluid u">
        <div className="d-flex" style={{ minHeight: '70vh' }}>
          <UserNav />
          <ReservationCards
            futureReservations={futureReservations}
            previousReservations={previousReservations}
            cancelModalToggle={this.cancelModalToggle}
            cancelReasonModalToggle={this.cancelReasonModalToggle}
            reviewModalToggle={this.reviewModalToggle}
            showReviewModalToggle={this.showReviewModalToggle}
          />
        </div>
        <CancelReasonModal
          isOpen={this.state.cancelReasonModal}
          toggle={this.cancelReasonModalToggle}
          reservation={this.state.reservation}
        />
        <ShowReviewModal
          isOpen={this.state.showReviewModal}
          toggle={this.showReviewModalToggle}
          reservation={this.state.reservation}
        />
        <CancelModal
          isOpen={this.state.cancelModal}
          toggle={this.cancelModalToggle}
          reservation={this.state.reservation}
          reloadData={this.reloadData}
        />
        <ReviewModal
          isOpen={this.state.reviewModal}
          toggle={this.reviewModalToggle}
          reservation={this.state.reservation}
          reloadData={this.reloadData}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Reservations);
