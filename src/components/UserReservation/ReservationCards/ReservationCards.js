import React from 'react';
import ReservationCard from '../ReservationCard/RervationCard';
import ReservationDetail from '../ReservationDetail/ReservationDetail';
import NoContent from '../../UI/NoContent/NoContent';
import './ReservationCards.css';

const Reservations = props => (
  <div className="u_bg">
    <div className="u_container">
      <div className="u_title">예약관리</div>
      <div className="urc_bg">
        <div className="urc_title">다가오는 예약</div>
        {props.futureReservations.length > 0 ? (
          props.futureReservations.map((reservation, key) => (
            <div className="urc_cardback" key={key}>
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
            // link="/designerList"
            // onClick={alert('아직 이용하실 수 없습니다.')} // 장막
            text="지금 바로 실력있는 예디들을 만나보세요"
          />
        )}
      </div>
      <div className="urc_bg2">
        <div className="urc_title">지난 예약</div>
        <div className="urc_cardback2">
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
  </div>
);

export default Reservations;
