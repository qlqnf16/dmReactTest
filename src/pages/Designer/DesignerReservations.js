import React, { Component } from 'react';
import axios from '../../config/Axios';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import CancelModal from '../../components/UI/ReservationModals/CancelModal';
import ShowReviewModal from '../../components/UI/ReservationModals/ShowReviewModal';
import CompleteModal from '../../components/UI/ReservationModals/CompleteModal';
import { connect } from 'react-redux';
import './Designer.css';
import ReservationCard from '../../components/DesignerReservations/ReservationCard';
import NoContent from '../../components/UI/NoContent/NoContent';

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
        `users/${
          this.props.userData._id
        }/reservations`
      );
      const reservations = data.filter(
        d => d._designer._id === this.props.userData._id
      );
      this.setState({
        reservations,
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
      `users/${
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
      `users/${this.props.userData._id}/reservations`
    );
    const reservations = data.filter(
      d => d._designer._id === this.props.userData._id
    );
    this.setState({
      reservations,
      madeRequest: true
    });
  };

  reservationSort = (r1, r2) => r1.date - r2.date;

  showMore = recruit => {
    this.props.history.push({
      pathname: `/designerdetail/${recruit._id}`
    });
  };

  showMessage = (reservationId, userName) => {
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
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div style={{ color: '#4c91ba' }} className="u_title ">
              예약관리
            </div>
            <div className="mb-5 pb-5">
              <div className="dr_title mb-2">다가오는 예약</div>
              <div className="row">
                {futureReservations.length > 0 ? (
                  futureReservations.map((futureReservation, key) => (
                    <ReservationCard
                      type={'soon'}
                      reservation={futureReservation}
                      cancelHandler={this.cancelReservationHandler}
                      cancelModalToggle={this.cancelModalToggle}
                      completeModalToggle={this.completeModalToggle}
                      key={key}
                      showMessage={this.showMessage}
                    />
                  ))
                ) : (
                  <NoContent
                    link="/designer/schedule"
                    text="지금 스케줄을 등록하고 모델을 구해보세요!"
                  />
                )}
              </div>
            </div>
            <div className=" dr_finish mb-5">
              <div className="dr_title">지난 예약</div>
              <div className="row">
                {previousReservations.map((previousReservation, key) => (
                  <ReservationCard
                    type={'finish'}
                    reservation={previousReservation}
                    cancelReasonModalToggle={this.cancelReasonModalToggle}
                    showReviewModalToggle={this.showReviewModalToggle}
                    key={key}
                    showMore={this.showMore}
                  />
                ))}
              </div>
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(DesignerReservations);
