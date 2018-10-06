import React from 'react';
import ReservationCard from '../ReservationCard/RervationCard';
import ReservationDetail from '../ReservationDetail/ReservationDetail';

const Reservations = props => (
  <div className="col-10">
    <h1 className="my-5">예약 관리</h1>
    <div className="m-4">
      <h4>다가오는 예약</h4>
      {props.previousReservations.map((reservation, key) => (
        <div className="row" key={key}>
          <ReservationCard
            reservation={reservation}
            type={'soon'}
            cancelHandler={props.cancelHandler}
          />
          <ReservationDetail
            requirement={'요구사항을 막 적으면 되는것 같다'}
            requireTime={'3박 4일'}
            // requirement={reservation.requirement}
            // requireTime={reservation.requireTime}
          />
        </div>
      ))}
    </div>
    <div className="m-4">
      <h4>지난 예약</h4>
      <div className="row">
        {props.previousReservations.map((reservation, key) => (
          <ReservationCard
            reservation={reservation}
            type={'finish'}
            key={key}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Reservations;
