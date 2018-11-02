import React from 'react';
import ReservationCard from './ReservationCard';
import NoContent from '../NoContent/NoContent';

const ReservationCards = props => {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>예약 관리</div>
      <div>
        <div style={subtitleStyle}>다가오는 예약</div>
        {props.futureReservations.length > 0 ? (
          props.futureReservations.map((futureReservation, key) => (
            <ReservationCard
              type={'soon'}
              reservation={futureReservation}
              cancelHandler={props.cancelReservationHandler}
              cancelModalToggle={props.cancelModalToggle}
              completeModalToggle={props.completeModalToggle}
              showMessage={props.showMessage}
              key={key}
              active
            />
          ))
        ) : (
          <NoContent
            link="/designer/schedule"
            text="지금 스케줄을 등록하고 모델을 구해보세요!"
          />
        )}
      </div>
      <div>
        <div style={subtitleStyle}>지난 예약</div>
        <div>
          {props.previousReservations.map((previousReservation, key) => (
            <ReservationCard
              type={'finish'}
              reservation={previousReservation}
              cancelReasonModalToggle={props.cancelReasonModalToggle}
              showReviewModalToggle={props.showReviewModalToggle}
              key={key}
              showMore={props.showMore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
    color: '#4c91ba',
    textAlign: 'left',
    margin: '33.5px 0'
  },
  subtitleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1f3354'
  }
};

const { containerStyle, titleStyle, subtitleStyle } = styles;

export default ReservationCards;
