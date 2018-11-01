import React from 'react';
import ReservationCard from './ReservationCard';
import ReservationDetail from './ReservationDetail';
import NoContent from '../../../components/UI/NoContent/NoContent';

const Reservations = props => (
  <div>
    <div>예약관리</div>
    <div>
      <div>다가오는 예약</div>
      {props.futureReservations.length > 0 ? (
        props.futureReservations.map((reservation, key) => (
          <div className="row" key={key}>
            <ReservationCard
              reservation={reservation}
              type={'soon'}
              cancelModalToggle={props.cancelModalToggle}
              showMessage={props.showMessage}
            />
            <div />
            <ReservationDetail reservation={reservation} />
          </div>
        ))
      ) : (
        <NoContent
          link="/designerList"
          text="지금 바로 실력있는 예디들을 만나보세요"
        />
      )}
    </div>
    <div>
      <div>지난 예약</div>
      <div className="row">
        {props.previousReservations.map((reservation, key) => (
          <ReservationCard
            reservation={reservation}
            type={'finish'}
            key={key}
            cancelReasonModalToggle={props.cancelReasonModalToggle}
            reviewModalToggle={props.reviewModalToggle}
            showReviewModalToggle={props.showReviewModalToggle}
            showMore={props.showMore}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Reservations;
