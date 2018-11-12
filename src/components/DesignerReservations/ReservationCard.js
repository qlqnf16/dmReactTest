import React from 'react';
import Moment from 'react-moment';
import './ReservationCard.css';
import calendar_o from '../../assets/images/calendar_o.png';
import calendar_x from '../../assets/images/calendar_x.png';
import place_o from '../../assets/images/place_o.png';
import place_x from '../../assets/images/place_x.png';
import scissors_o from '../../assets/images/scissors_o.png';
import scissors_x from '../../assets/images/scissors_x.png';

const ReservationCard = props => {
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
    if (props.reservation.services) {
      Object.keys(props.reservation.services).forEach(service => {
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
      });
      services = services.substring(1);
    }
  }
  let button = null;
  let type = null;
  let dDay = false;
  if (props.reservation.isCanceled) {
    button = (
      <button
        className="rc_button canceled"
        onClick={() => props.cancelReasonModalToggle(props.reservation)}
      >
        취소 사유 보기
      </button>
    );
    type = <div className="rc_type canceled">취소</div>;
  } else if (props.type === 'soon') {
    button = (
      <button
        className="rc_button"
        onClick={() => props.cancelModalToggle(props.reservation)}
      >
        예약 취소
      </button>
    );
    type = (
      <div className="rc_type">
        D-
        <Moment unit="days" diff={new Date()}>
          {props.reservation.date + 86400000}
        </Moment>
      </div>
    );
    let date = new Date(props.reservation.date);
    if (new Date() >= date || new Date().getDate() === date.getDate()) {
      dDay = true;
      if (new Date().getDate() === date.getDate()) {
        type = <div className="rc_type">D-day</div>;
      } else
        type = (
          <div className="rc_type">
            D+
            <Moment unit="days" diff={props.reservation.date - 86400000}>
              {new Date()}
            </Moment>
          </div>
        );
      button = (
        <button
          className="rc_button review"
          onClick={() => props.completeModalToggle(props.reservation)}
        >
          서비스 완료
        </button>
      );
    }
  } else if (props.type === 'finish') {
    if (props.reservation._review) {
      button = (
        <button
          className="rc_button review"
          onClick={() => props.showReviewModalToggle(props.reservation)}
        >
          리뷰 보기
        </button>
      );
    } else {
      button = <button className="rc_button">리뷰 등록 전</button>;
    }
    type = <div className="rc_type rc_finish">완료</div>;
  }
  return (
    <div className="col-3 my-2 px-2">
      <div className={`drc_${dDay ? 'dDay' : props.type} rc_back p-4`}>
        <div className="text-right">{type}</div>
        <div
          className={
            props.type === 'soon' ? 'rc_content drc_title' : 'drc_title drc_off'
          }
        >
          {props.reservation._user.name}
        </div>
        <div
          className={props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'}
        >
          <img
            alt="alt"
            src={props.type === 'soon' ? calendar_o : calendar_x}
            className="rc_icon"
          />{' '}
          <Moment unix format="YYYY/MM/DD">
            {props.reservation.date / 1000}
          </Moment>{' '}
          {since} ~ {until}
        </div>
        <div
          className={props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'}
        >
          <img
            alt="alt"
            src={props.type === 'soon' ? place_o : place_x}
            className="rc_icon"
          />{' '}
          {props.reservation._card && props.reservation._card.shop}
        </div>
        <div
          className={props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'}
        >
          <img
            alt="alt"
            src={props.type === 'soon' ? scissors_o : scissors_x}
            className="rc_icon"
          />{' '}
          {services}
        </div>
        <div className="mt-4 d-flex justify-content-between">
          {button}
          <div
            className="rc_button"
            style={{ color: '#1f3354', marginLeft: '22px' }}
            onClick={
              props.type === 'soon'
                ? () => props.showMessage(props.reservation._id)
                : () => props.showMore(props.reservation._designer._recruit)
            }
          >
            {props.type === 'soon' ? '메세지' : '더보기'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
