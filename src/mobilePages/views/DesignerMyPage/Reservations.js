import React, { Component } from 'react';
import DesignerNav from '../../components/NavigationBar/DesignerNav';
import axios from '../../../config/Axios';
import CancelReasonModal from '../../../components/UI/ReservationModals/CancelReasonModal';
import CancelModal from '../../../components/UI/ReservationModals/CancelModal';
import ShowReviewModal from '../../../components/UI/ReservationModals/ShowReviewModal';
import CompleteModal from '../../../components/UI/ReservationModals/CompleteModal';
import { connect } from 'react-redux';
import ReservationCards from '../../components/DesignerReservation/ReservationCards';

class DesignerReservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: null,
      madeRequest: false,
      cancelModal: false,
      showReviewModal: false,
      cancelReasonModal: false,
      completeModal: false,
      reservation: null
    };
  }

  showReviewModalToggle = reservation => {
    this.setState({
      showReviewModal: !this.state.showReviewModal,
      reservation
    });
  };
  cancelModalToggle = reservation => {
    this.setState({
      cancelModal: !this.state.cancelModal,
      reservation
    });
  };
  completeModalToggle = reservation => {
    this.setState({
      completeModal: !this.state.completeModal,
      reservation
    });
  };
  cancelReasonModalToggle = reservation => {
    this.setState({
      cancelReasonModal: !this.state.cancelReasonModal,
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
      const reservations = data.filter(
        d => d._designer._id === this.props.userData._id
      );
      this.setState({ reservations, madeRequest: true });
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
    await this.cancelHandler();
    await this.reloadData();
  };
  reloadData = async () => {
    const { data } = await axios.get(
      `http://52.79.227.227:3030/users/${this.props.userData._id}/reservations`
    );
    const reservations = data.filter(
      d => d._designer._id === this.props.userData._id
    );
    this.setState({ reservations, madeRequest: true });
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
      <div>
        <DesignerNav />
        <div className="m_containerStyle">
          <ReservationCards
            futureReservations={futureReservations}
            previousReservations={previousReservations}
            cancelModalToggle={this.cancelModalToggle}
            cancelReasonModalToggle={this.cancelReasonModalToggle}
            reviewModalToggle={this.reviewModalToggle}
            showReviewModalToggle={this.showReviewModalToggle}
            completeModalToggle={this.completeModalToggle}
            showMore={this.showMore}
            showMessage={this.showMessage}
          />
        </div>
        <CancelReasonModal
          isOpen={this.state.cancelReasonModal}
          toggle={this.cancelReasonModalToggle}
          reservation={this.state.reservation}
          isD={true}
        />
        <CancelModal
          isOpen={this.state.cancelModal}
          toggle={this.cancelModalToggle}
          reservation={this.state.reservation}
          cancelReservationHandler={this.cancelReservationHandler}
          reloadData={this.reloadData}
          isD={true}
        />
        <ShowReviewModal
          isOpen={this.state.showReviewModal}
          toggle={this.showReviewModalToggle}
          reservation={this.state.reservation}
          isD={true}
        />
        <CompleteModal
          isOpen={this.state.completeModal}
          toggle={this.completeModalToggle}
          reservation={this.state.reservation}
          reloadData={this.reloadData}
          isD={true}
        />
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(DesignerReservations);
