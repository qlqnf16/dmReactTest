import React from 'react';
import ReservationCard from '../ReservationCard/RervationCard';
import ReservationDetail from '../ReservationDetail/ReservationDetail';

const Reservations = props => (
  <div className="col-10">
    <h1 className="my-5">예약 관리</h1>
    <div className="m-4">
      <h4>다가오는 예약</h4>
      {props.futureReservations.map((reservation, key) => (
        <div className="row" key={key}>
          <ReservationCard
            designerName={reservation._designer.name}
            title={reservation.title}
            date={reservation.time.until}
            location={`${reservation._designer.locations[0].shop} / ${
              reservation._designer.locations[0].address
            }`}
            type={'컷/염색'}
            state={'D-2'}
          />
          <ReservationDetail
            requirement={'요구사항을 막 적으면 되는것 같다'}
            additionalPrice={'추가 금액은 10억이다'}
            // requirement={reservation.requirement}
            // additionalPrice={reservation.additionalPrice}
          />
        </div>
      ))}
    </div>
    <div className="m-4">
      <h4>지난 예약</h4>
      {props.previousReservations.map((reservation, key) => (
        <div className="row" key={key}>
          <ReservationCard
            designerName={reservation._designer.name}
            title={reservation.title}
            date={reservation.time.until}
            location={`${reservation._designer.locations[0].shop} / ${
              reservation._designer.locations[0].address
            }`}
            type={'컷/염색'}
            state={reservation.isCanceled ? '취소' : '완료'}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Reservations;
