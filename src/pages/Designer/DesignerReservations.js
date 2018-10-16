import React, { Component } from 'react';
import axios from 'axios';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import CancelModal from '../../components/UI/ReservationModals/CancelModal';
import ShowReviewModal from '../../components/UI/ReservationModals/ShowReviewModal';
import CompleteModal from '../../components/UI/ReservationModals/CompleteModal';
import { connect } from 'react-redux';
import './Designer.css';
import ReservationCard from '../../components/DesignerReservations/ReservationCard';

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

    this.cancelModalToggle = this.cancelModalToggle.bind(this);
    this.cancelReasonModalToggle = this.cancelReasonModalToggle.bind(this);
    this.showReviewModalToggle = this.showReviewModalToggle.bind(this);
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
      // 일단은 더미유저 아이디를 가져와서 사용. 이후 현재 로그인 유저의 아이디로 요청을 보내면 됨.
      const { data } = await axios.get(
        `http://52.79.227.227:3030/users/${
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
    console.log(this.props);
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
    this.setState({
      reservations,
      madeRequest: true
    });
  };

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
      previousReservations = this.state.reservations.filter(
        reservation =>
          reservation.date <= new Date().getTime() ||
          reservation.isCanceled ||
          reservation.isDone
      );
    }
    console.log(previousReservations);

    return (
      <div className="container">
        <h1 className="u_title ">예약 관리</h1>
        <div className="mb-5 pb-5">
          <div className="dr_title mb-2">다가오는 예약</div>
          <div className="row">
            {futureReservations.map((futureReservation, key) => (
              <ReservationCard
                type={'soon'}
                reservation={futureReservation}
                cancelHandler={this.cancelReservationHandler}
                cancelModalToggle={this.cancelModalToggle}
                completeModalToggle={this.completeModalToggle}
                key={key}
              />
            ))}
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
              />
            ))}
          </div>
        </div>
        <CancelReasonModal
          isOpen={this.state.cancelReasonModal}
          toggle={this.cancelReasonModalToggle}
          reservation={this.state.reservation}
        />
        <CancelModal
          isOpen={this.state.cancelModal}
          toggle={this.cancelModalToggle}
          reservation={this.state.reservation}
          cancelReservationHandler={this.cancelReservationHandler}
          reloadData={this.reloadData}
        />
        <ShowReviewModal
          isOpen={this.state.showReviewModal}
          toggle={this.showReviewModalToggle}
          reservation={this.state.reservation}
        />
        <CompleteModal
          isOpen={this.state.completeModal}
          toggle={this.completeModalToggle}
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

export default connect(mapStateToProps)(DesignerReservations);
