import React, { Component } from 'react';
import axios from '../../config/Axios';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import ReservationCards from '../../components/UserReservation/ReservationCards/ReservationCards';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import CancelModal from '../../components/UI/ReservationModals/CancelModal';
import ReviewModal from '../../components/UI/ReservationModals/ReviewModal';
import { connect } from 'react-redux';
import './UserCss.css';
import ChangeReviewModal from '../../components/UI/ReservationModals/ChangeReviewModal';

class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      madeRequest: false,
      cancelReasonModal: false,
      cancelModal: false,
      reviewModal: false,
      changeReviewModal: false,
      reservation: null,
      isToday: false
    };
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

  cancelModalToggle = (reservation, isToday) => {
    this.setState({
      cancelModal: !this.state.cancelModal,
      reservation
    });
    if (isToday) this.setState({ isToday: true });
  };

  changeReviewModalToggle = reservation => {
    this.setState({
      changeReviewModal: !this.state.changeReviewModal,
      reservation
    });
  };

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      const { data } = await axios.get(
        `users/${this.props.userData._id}/reservations`
      );
      this.setState({
        reservations: data,
        madeRequest: true
      });
    }
  };

  reloadData = async () => {
    const { data } = await axios.get(
      `users/${this.props.userData._id}/reservations`
    );
    this.setState({
      reservations: data,
      madeRequest: true
    });
  };

  reservationSort = (r1, r2) => r1.date - r2.date;

  showMore = recruit => {
    this.props.history.push({
      pathname: `/designerdetail/${recruit._id}`
    });
  };

  showMessage = reservationId => {
    this.props.history.push({
      pathname: `/chat`,
      search: `?r=${reservationId}`
    });
  };

  render() {
    let futureReservations = [];
    let previousReservations = [];
    if (this.state.reservations) {
      futureReservations = this.state.reservations.filter(
        reservation =>
          // reservation.date > new Date().getTime() &&
          !reservation.isCanceled && !reservation.isDone
      );
      futureReservations.sort(this.reservationSort);
      previousReservations = this.state.reservations.filter(
        reservation =>
          // reservation.date <= new Date().getTime() ||
          reservation.isCanceled || reservation.isDone
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
            changeReviewModalToggle={this.changeReviewModalToggle}
            showMore={this.showMore}
            showMessage={this.showMessage}
          />
        </div>
        <CancelReasonModal
          isOpen={this.state.cancelReasonModal}
          toggle={this.cancelReasonModalToggle}
          reservation={this.state.reservation}
        />
        <ChangeReviewModal
          isOpen={this.state.changeReviewModal}
          toggle={this.changeReviewModalToggle}
          reservation={this.state.reservation}
          reloadData={this.reloadData}
        />
        <CancelModal
          isOpen={this.state.cancelModal}
          toggle={this.cancelModalToggle}
          reservation={this.state.reservation}
          reloadData={this.reloadData}
          isToday={this.state.isToday}
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
