import React from 'react';
import Moment from 'react-moment';
import './ReservationCard.css';
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
    if (props.reservation.services) {
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
          {props.reservation.date + 86400000}
        </Moment>
      </div>
    );
    let date = new Date(props.reservation.date);
    if (new Date().getDate() === date.getDate() || new Date() >= date) {
      if (new Date().getDate() === date.getDate()) {
        type = <div className="rc_type">D-day</div>;
        button = (
          <div
            className="rc_button canceled"
            onClick={() => {
              alert('당일 취소는 경고 1회 누적됩니다.');
              props.cancelModalToggle(props.reservation, true);
            }}
          >
            예약취소
          </div>
        );
      } else {
        type = (
          <div className="rc_type">
            D+
            <Moment unit="days" diff={props.reservation.date - 86400000}>
              {new Date()}
            </Moment>
          </div>
        );

        button = (
          <div
            className="rc_button review"
            onClick={() => {
              alert('서비스 완료 전입니다');
            }}
          >
            완료 대기중
          </div>
        );
      }
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
    return (
      <div>
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

          <div className="rc_content rc_title">
            {props.reservation._designer._recruit.title}
          </div>
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
            <div
              className="rc_button"
              style={{ color: '#1f3354', marginLeft: '22px' }}
              onClick={
                props.type === 'soon'
                  ? () => props.showMessage(props.reservation._id)
                  : () => props.showMore(props.reservation._designer._recruit)
              }
            >
              {props.type === 'soon' ? '메시지' : '더보기'}
            </div>
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
