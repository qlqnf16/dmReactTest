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
    <div>
      <div>요청사항</div>
      <div>{reservation._designer._recruit.requirement}</div>
      <div>예상 시술 소요시간</div>
      <div>
        {services} : 총 {timeFormat}
      </div>
    </div>
  );
};
export default ReservationDetail;
