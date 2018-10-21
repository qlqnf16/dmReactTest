import React from 'react';
import './ReservationDetail.css';
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
  Object.keys(reservation.services).forEach(service => {
    switch (service) {
      case 'cut':
        services += '/ 컷트 ';
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

  return (
    <div
      className="col-lg-8 col-12 col-md-6 rd_back"
      style={{
        backgroundImage: `url(${spch_bubble})`
      }}
    >
      <div>
        <div className="rd_title">요청사항</div>
        <div className="rd_content">
          {reservation._designer._recruit.requirement}
        </div>
        <div className="rd_title">예상 시술 소요시간</div>
        <div className="rd_content">
          {services} : 총 {timeFormat}
        </div>
      </div>
    </div>
  );
};
export default ReservationDetail;
