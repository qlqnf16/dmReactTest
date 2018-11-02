import React from 'react';
import Moment from 'react-moment';
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
  // type따라 버튼 변경
  let button = null;
  let type = null;
  if (props.reservation.isCanceled) {
    button = (
      <div
        style={{ ...buttonStyle, backgroundColor: '#dd6866', color: 'white' }}
        onClick={() => props.cancelReasonModalToggle(props.reservation)}
      >
        취소 사유 보기
      </div>
    );
    type = <div style={typeStyle}>취소</div>;
  } else if (props.type === 'soon') {
    button = (
      <div
        style={buttonStyle}
        onClick={() => props.cancelModalToggle(props.reservation)}
      >
        예약취소
      </div>
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
    if (new Date().getDate() === date.getDate() || new Date() >= date) {
      if (new Date().getDate() === date.getDate()) {
        type = <div style={typeStyle}>D-day</div>;
        button = (
          <div
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
          <div style={typeStyle}>
            D+
            <Moment unit="days" diff={props.reservation.date - 86400000}>
              {new Date()}
            </Moment>
          </div>
        );

        button = (
          <div
            style={buttonStyle}
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
          style={buttonStyle}
          onClick={() => props.showReviewModalToggle(props.reservation)}
        >
          내 리뷰 보기
        </div>
      );
    } else {
      button = (
        <div
          style={{ ...buttonStyle, backgroundColor: '#66ce82', color: 'white' }}
          onClick={() => props.reviewModalToggle(props.reservation)}
        >
          리뷰 등록
        </div>
      );
    }
    type = (
      <div style={{ ...typeStyle, color: 'rgba(102, 206, 130, 0.5)' }}>
        완료
      </div>
    );
  }

  // return
  if (props.reservation) {
    return (
      <div
        style={props.active ? { ...cardStyle, ...activeCardStyle } : cardStyle}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={designerStyle}>{props.reservation._designer.name}</div>
          {type}
        </div>

        <div style={titleStyle}>
          {props.reservation._designer._recruit.title}
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
            {props.type === 'soon' ? '메시지' : '더보기'}
          </div>
        </div>
        <div style={contentStyle}>예약번호: {props.reservation._id}</div>
      </div>
    );
  } else {
    return <div />;
  }
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
  designerStyle: {
    fontSize: '1.0rem',
    fontWeight: 'bold'
  },
  titleStyle: {
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
  designerStyle,
  titleStyle,
  contentStyle,
  buttonStyle,
  activeCardStyle,
  typeStyle
} = styles;

export default ReservationCard;
