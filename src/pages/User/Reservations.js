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
    this.cancelHandler = this.cancelHandler.bind(this);
    this.reviewModalToggle = this.reviewModalToggle.bind(this);
  }

  reviewModalToggle = reservation => {
    this.setState({
      reviewModal: !this.state.reviewModal,
      reservation
    });
  };
  cancelReasonModalToggle = () => {
    this.setState({
      cancelReasonModal: !this.state.cancelReasonModal
    });
  };
  cancelModalToggle = () => {
    this.setState({
      cancelModal: !this.state.cancelModal
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

  cancelHandler = reservation => {
    this.setState({
      cancelModal: !this.state.cancelModal,
      reservation
    });
  };
  cancelReservationHandler = async () => {
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
      }/reservations/${this.state.reservation._id}`,
      {
        isCanceled: true
      }
    );
    await this.reloadData();
    await this.cancelHandler();
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
            cancelHandler={this.cancelHandler}
            cancelReasonModalToggle={this.cancelReasonModalToggle}
            reviewModalToggle={this.reviewModalToggle}
            showReviewModalToggle={this.showReviewModalToggle}
          />
        </div>
        <CancelReasonModal
          isOpen={this.state.cancelReasonModal}
          toggle={this.cancelReasonModalToggle}
        />
        <ShowReviewModal
          isOpen={this.state.showReviewModal}
          toggle={this.showReviewModalToggle}
          reservation={this.state.reservation}
        />
        <CancelModal
          isOpen={this.state.cancelModal}
          toggle={this.cancelModalToggle}
          cancelReservationHandler={this.cancelReservationHandler}
        />
        <ReviewModal
          isOpen={this.state.reviewModal}
          toggle={this.reviewModalToggle}
          reservation={this.state.reservation}
          reviewModalToggle={this.reviewModalToggle}
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
