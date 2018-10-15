import React from 'react';
import ReservationCard from '../ReservationCard/RervationCard';
import ReservationDetail from '../ReservationDetail/ReservationDetail';
import './ReservationCards.css';

const Reservations = props => (
  <div className="u_bg">
    <div className="u_container">
      <div className="u_title">예약관리</div>
      <div className="urc_bg">
        <div className="urc_title">다가오는 예약</div>
        {props.futureReservations.map((reservation, key) => (
          <div className="row urc_cardback" key={key}>
            <ReservationCard
              reservation={reservation}
              type={'soon'}
              cancelModalToggle={props.cancelModalToggle}
            />
            <ReservationDetail reservation={reservation} />
          </div>
        ))}
      </div>
      <div className="urc_bg2">
        <div className="urc_title">지난 예약</div>
        <div className="urc_cardback2 row m-0">
          {props.previousReservations.map((reservation, key) => (
            <ReservationCard
              reservation={reservation}
              type={'finish'}
              key={key}
              cancelReasonModalToggle={props.cancelReasonModalToggle}
              reviewModalToggle={props.reviewModalToggle}
              showReviewModalToggle={props.showReviewModalToggle}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Reservations;
