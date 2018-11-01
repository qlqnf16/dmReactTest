import React from 'react';
import spch_bubble from '../../../assets/images/spch_bubble_user.png';

const ReservationDetail = props => {
  const reservation = props.reservation;
  const requireTime = reservation.time.until - reservation.time.since;

  // Time 포맷
  let timeFormat = '';
  timeFormat +=
    Math.floor(requireTime / 60) === 0
      ? ''
      : `${Math.floor(requireTime / 60)}시간`;
  timeFormat += requireTime % 60 === 0 ? '' : `${requireTime % 60}분`;

  // services 포맷
  let services = '';
  if (reservation.services) {
    Object.keys(reservation.services).forEach(service => {
      switch (service) {
        case 'cut':
          services += '/ 커트 ';
          break;
        case 'perm':
          services += '/ 펌 ';
          break;
        case 'dye':
          services += '/ 염색 ';
          break;
        default:
          break;
      }
      services = services.substring(1);
    });
  }

  return (
    <div style={cautionStyle}>
      <div style={titleStyle}>요청사항</div>
      <div style={contentStyle}>
        {reservation._designer._recruit.requirement}
      </div>
      <div style={titleStyle}>예상 시술 소요시간</div>
      <div style={contentStyle}>
        {services} : 총 {timeFormat}
      </div>
    </div>
  );
};
const styles = {
  cautionStyle: {
    margin: '3rem 0',
    color: '#2b2e34',
    fontSize: '1.2rem',
    padding: '5%',
    border: 'solid 1px #c1e4eb',
    borderRadius: 5
  },
  titleStyle: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#dd6866'
  },
  contentStyle: {
    margin: '10px 0 15px 0'
  }
};

const { cautionStyle, titleStyle, contentStyle } = styles;
export default ReservationDetail;
