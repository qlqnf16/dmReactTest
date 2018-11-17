import React from 'react';
import ReservationCard from './ReservationCard';
import ReservationDetail from './ReservationDetail';
import NoContent from '../NoContent/NoContent';

const Reservations = props => (
  <div style={containerStyle}>
    <div style={titleStyle}>예약관리</div>
    <div>
      <div style={subtitleStyle}>다가오는 예약</div>
      {props.futureReservations.length > 0 ? (
        props.futureReservations.map((reservation, key) => (
          <div key={key}>
            <ReservationCard
              reservation={reservation}
              type={'soon'}
              cancelModalToggle={props.cancelModalToggle}
              showMessage={props.showMessage}
              active
            />
            <div />
            <ReservationDetail reservation={reservation} />
          </div>
        ))
      ) : (
        <NoContent
          // link="/designerList"
          onClick={alert('아직 이용하실 수 없습니다.')} // 장막
          text="지금 바로 실력있는 예디들을 만나보세요"
        />
      )}
    </div>
    <div>
      <div style={subtitleStyle}>지난 예약</div>
      <div>
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

const styles = {
  containerStyle: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  titleStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#dd6866',
    textAlign: 'left',
    marginTop: '33.5px',
    paddingBottom: 6.9,
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354',
    marginTop: '33.5px'
  }
};

const { containerStyle, titleStyle, subtitleStyle } = styles;

export default Reservations;
