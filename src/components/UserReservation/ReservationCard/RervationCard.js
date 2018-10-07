import React from 'react';
import Moment from 'react-moment';

const ReservationCard = props => {
  // 시간 parse
  let since = '';
  let until = '';
  let services = '';
  if (props.reservation) {
    since = `${parseInt(props.reservation.time.since / 60, 10)}:${
      props.reservation.time.since % 60 === 0 ? '00' : '30'
    }`;
    until = `${parseInt(props.reservation.time.until / 60, 10)}:${
      props.reservation.time.until % 60 === 0 ? '00' : '30'
    }`;
    Object.keys(props.reservation.services).forEach(service => {
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
    });
    services = services.substring(1);
  }

  // type따라 버튼 변경
  let button = null;
  let type = null;
  if (props.reservation.isCanceled) {
    button = (
      <button onClick={() => props.cancelModalToggle()}>취소 사유 보기</button>
    );
    type = '취소';
  } else if (props.type === 'soon') {
    button = (
      <button onClick={() => props.cancelHandler(props.reservation._id)}>
        예약 취소
      </button>
    );
    type = 'D-2';
  } else if (props.type === 'finish') {
    if (props.reservation._review) {
      button = (
        <button onClick={() => props.reviewModalToggle()}>내 리뷰 보기</button>
      );
    } else {
      button = (
        <button onClick={() => props.reviewModalToggle()}>리뷰 등록</button>
      );
    }
    type = '완료';
  }

  // return
  if (props.reservation) {
    return (
      <div className="col-4">
        <div className="border p-3 m-1">
          <h5 className=" text-right">{type}</h5>
          <h5 className="small">{props.reservation._designer.name}</h5>
          <h4>타이틀이 디비에 없네</h4>
          <p className="small">
            <Moment unix format="YYYY/MM/DD">
              {props.reservation.date / 1000}
            </Moment>{' '}
            {since} ~ {until}
          </p>
          <p className="small my-1">{props.reservation._card.shop}</p>
          <p className="small mt-1">{services}</p>
          {button}
          <button>더보기</button>
          <p className="small">{props.reservation._id}</p>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ReservationCard;
