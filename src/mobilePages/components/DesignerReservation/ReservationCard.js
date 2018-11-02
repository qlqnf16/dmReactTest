import React from 'react';
import Moment from 'react-moment';
import calendar_o from '../../../assets/images/calendar_o.png';
import calendar_x from '../../../assets/images/calendar_x.png';
import place_o from '../../../assets/images/place_o.png';
import place_x from '../../../assets/images/place_x.png';
import scissors_o from '../../../assets/images/scissors_o.png';
import scissors_x from '../../../assets/images/scissors_x.png';

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
        style={{ ...buttonStyle, backgroundColor: '#dd6866', color: 'white' }}
        onClick={() => props.cancelReasonModalToggle(props.reservation)}
      >
        취소 사유 보기
      </button>
    );
    type = <div style={typeStyle}>취소</div>;
  } else if (props.type === 'soon') {
    button = (
      <button
        style={buttonStyle}
        onClick={() => props.cancelModalToggle(props.reservation)}
      >
        예약 취소
      </button>
    );
    type = (
      <div style={typeStyle}>
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
        type = <div style={typeStyle}>D-day</div>;
      } else
        type = (
          <div style={typeStyle}>
            D+
            <Moment unit="days" diff={props.reservation.date - 86400000}>
              {new Date()}
            </Moment>
          </div>
        );
      button = (
        <button
          style={{ ...buttonStyle, backgroundColor: '#66ce82', color: 'white' }}
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
          style={{ ...buttonStyle, backgroundColor: '#66ce82', color: 'white' }}
          onClick={() => props.showReviewModalToggle(props.reservation)}
        >
          리뷰 보기
        </button>
      );
    } else {
      button = <button style={buttonStyle}>리뷰 등록 전</button>;
    }
    type = (
      <div style={{ ...typeStyle, color: 'rgba(102, 206, 130, 0.5)' }}>
        완료
      </div>
    );
  }
  return (
    <div
      style={props.active ? { ...cardStyle, ...activeCardStyle } : cardStyle}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={userNameStyle}>{props.reservation._user.name}</div>
        {type}
      </div>

      <div style={contentStyle}>
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
      <div style={contentStyle}>
        <img
          alt="alt"
          src={props.type === 'soon' ? place_o : place_x}
          className="rc_icon"
        />{' '}
        {props.reservation._card && props.reservation._card.shop}
      </div>
      <div style={contentStyle}>
        <img
          alt="alt"
          src={props.type === 'soon' ? scissors_o : scissors_x}
          className="rc_icon"
        />{' '}
        {services}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '1.5rem 0'
        }}
      >
        {button}
        <div
          style={buttonStyle}
          onClick={
            props.type === 'soon'
              ? () => props.showMessage(props.reservation._id)
              : () => props.showMore(props.reservation._designer._recruit)
          }
        >
          더보기
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardStyle: {
    width: '85%',
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '5px',
    margin: '1rem auto',
    color: 'rgba(0, 0, 0, 0.5)'
  },
  userNameStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '8px 0'
  },
  contentStyle: {
    fontSize: '1.0rem',
    margin: '7px 0'
  },
  buttonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '47.5%',
    padding: 7,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.65)'
  },
  activeCardStyle: {
    backgroundColor: '#ffffdf',
    color: '#1f3354'
  },
  typeStyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#f5b1ad'
  }
};

const {
  cardStyle,
  userNameStyle,
  contentStyle,
  buttonStyle,
  activeCardStyle,
  typeStyle
} = styles;

export default ReservationCard;
