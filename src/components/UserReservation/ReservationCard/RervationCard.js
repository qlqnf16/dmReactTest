import React from 'react';
import Moment from 'react-moment';
import './ReservationCard.css';

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
      <div
        className="rc_button rc_canceled"
        onClick={() => props.cancelModalToggle()}
      >
        취소 사유 보기
      </div>
    );
    type = <div className="rc_type cancel">취소</div>;
  } else if (props.type === 'soon') {
    button = (
      <div
        className="rc_button"
        onClick={() => props.cancelHandler(props.reservation._id)}
      >
        예약취소
      </div>
    );
    type = <div className="rc_type">D-2</div>;
  } else if (props.type === 'finish') {
    if (props.reservation._review) {
      button = (
        <div className="rc_button" onClick={() => props.reviewModalToggle()}>
          내 리뷰 보기
        </div>
      );
    } else {
      button = (
        <div
          className="rc_button review"
          onClick={() => props.reviewModalToggle()}
        >
          리뷰 등록
        </div>
      );
    }
    type = <div className="rc_type rc_finish">완료</div>;
  }

  // return
  if (props.reservation) {
    return (
      <div className={`rc_back ${props.type}`}>
        <div className="d-flex justify-content-between">
          <div className="rc_content">
            {props.reservation._designer.name}
            이정민
          </div>
          {type}
        </div>

        <div className="rc_content rc_title">타이틀이 디비에 없네</div>
        <div className="rc_content">
          <Moment unix format="YYYY/MM/DD">
            {props.reservation.date / 1000}
          </Moment>{' '}
          {since} ~ {until}
        </div>
        <div className="rc_content">
          {props.reservation._card && props.reservation._card.shop}
        </div>
        <div className="rc_content">{services} (현장 3만원)</div>
        <div className="d-flex justify-content-between">
          {button}
          <div className="rc_button" style={{ marginLeft: '22px' }}>
            더보기
          </div>
        </div>
        <div className="rc_content rc_rnumber">
          예약번호: {props.reservation._id}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ReservationCard;
