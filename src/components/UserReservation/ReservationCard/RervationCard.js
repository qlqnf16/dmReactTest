import React from 'react';
import Moment from 'react-moment';
import './ReservationCard.css';
import { Link } from 'react-router-dom';
import calendar_o from '../../../assets/images/calendar_o.png';
import calendar_x from '../../../assets/images/calendar_x.png';
import place_o from '../../../assets/images/place_o.png';
import place_x from '../../../assets/images/place_x.png';
import scissors_o from '../../../assets/images/scissors_o.png';
import scissors_x from '../../../assets/images/scissors_x.png';

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
        className="rc_button canceled"
        onClick={() => props.cancelReasonModalToggle(props.reservation)}
      >
        취소 사유 보기
      </div>
    );
    type = <div className="rc_type canceled">취소</div>;
  } else if (props.type === 'soon') {
    button = (
      <div
        className="rc_button"
        onClick={() => props.cancelModalToggle(props.reservation)}
      >
        예약취소
      </div>
    );
    type = (
      <div className="rc_type">
        D-
        <Moment unit="days" diff={new Date()}>
          {props.reservation.date}
        </Moment>
      </div>
    );
    let date = new Date(props.reservation.date);
    if (new Date().getDate() === date.getDate()) {
      type = <div className="rc_type">'D-day';</div>;
      button = (
        <div
          className="rc_button review"
          onClick={() => {
            alert('서비스 완료 전입니다');
          }}
        >
          리뷰등록
        </div>
      );
    }
  } else if (props.type === 'finish') {
    if (props.reservation._review) {
      button = (
        <div
          className="rc_button"
          onClick={() => props.showReviewModalToggle(props.reservation)}
        >
          내 리뷰 보기
        </div>
      );
    } else {
      button = (
        <div
          className="rc_button review"
          onClick={() => props.reviewModalToggle(props.reservation)}
        >
          리뷰 등록
        </div>
      );
    }
    type = <div className="rc_type rc_finish">완료</div>;
  }

  // return
  if (props.reservation) {
    console.log(props.reservation);
    return (
      <div className={`col-12 col-md-6 col-lg-4 my-2 mx-0 px-2`}>
        <div className={`${props.type} rc_back`}>
          <div className="d-flex justify-content-between">
            <div
              className={
                props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'
              }
              style={{ fontWeight: 'bold' }}
            >
              {props.reservation._designer.name}
            </div>
            {type}
          </div>

          <div className="rc_content rc_title">타이틀이 디비에 없네</div>
          <div
            className={
              props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'
            }
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
            className={
              props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'
            }
          >
            <img
              alt="alt"
              src={props.type === 'soon' ? place_o : place_x}
              className="rc_icon"
            />{' '}
            {props.reservation._card && props.reservation._card.shop}
          </div>
          <div
            className={
              props.type === 'soon' ? 'rc_content' : 'rc_content rc_off'
            }
          >
            <img
              alt="alt"
              src={props.type === 'soon' ? scissors_o : scissors_x}
              className="rc_icon"
            />{' '}
            {services}
          </div>
          <div className="d-flex justify-content-between">
            {button}
            <Link
              to={`/designerdetail/${props.reservation._designer._recruit._id}`}
              className="rc_button"
              style={{
                color: '#1f3354',
                textDecoration: 'none',
                marginLeft: '22px'
              }}
            >
              <div>더보기</div>
            </Link>
          </div>
          <div
            className={
              props.type === 'soon'
                ? 'rc_content rc_rnumber'
                : 'rc_content rc_off rc_rnumber'
            }
          >
            예약번호: {props.reservation._id}
          </div>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ReservationCard;
