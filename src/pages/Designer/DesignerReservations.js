import React, { Component } from 'react';
import axios from 'axios';
import CancelReasonModal from '../../components/UI/ReservationModals/CancelReasonModal';
import ReviewModal from '../../components/UI/ReservationModals/ReviewModal';
import { connect } from 'react-redux';

import ReservationCard from '../../components/DesignerReservations/ReservationCard';

class DesignerReservations extends Component {
  constructor(props) {
    super(props);
    this.state = { cancelModal: false, reviewModal: false };

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

  cancelReservationHandler = async reservationId => {
    console.log(this.props);
    const users = (await axios.get(`http://52.79.227.227:3030/users`)).data;
    await axios.patch(
      `http://52.79.227.227:3030/users/${
        this.props.userData._id
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
    console.log(futureReservations);

    return (
      <div className="container">
        <h1 className="my-5">예약 관리</h1>
        <div className="m-4">
          <h4>다가오는 예약</h4>
          <div className="row">
            {futureReservations.map((futureReservation, key) => (
              <ReservationCard
                type={'soon'}
                reservation={futureReservation}
                cancelHandler={this.cancelReservationHandler}
                cancelModalToggle={this.cancelModalToggle}
                reviewModalToggle={this.reviewModalToggle}
                key={key}
              />
            ))}
          </div>
        </div>
        <div className="m-4">
          <h4>완료된 예약</h4>
          <div className="row">
            {previousReservations.map((previousReservation, key) => (
              <ReservationCard
                type={'finish'}
                reservation={previousReservation}
                cancelHandler={this.cancelReservationHandler}
                cancelModalToggle={this.cancelModalToggle}
                reviewModalToggle={this.reviewModalToggle}
                key={key}
              />
            ))}
          </div>
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
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(DesignerReservations);
