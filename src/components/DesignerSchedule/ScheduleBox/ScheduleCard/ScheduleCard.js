import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import './ScheduleCard.css';
import Delete from '../../../../assets/images/delete.png';

const ScheduleCard = props => {
  const dayOfWeek = date => {
    switch (moment(date).day()) {
      case 1:
        return '월';
      case 2:
        return '화';
      case 3:
        return '수';
      case 4:
        return '목';
      case 5:
        return '금';
      case 6:
        return '토';
      case 0:
        return '일';
      default:
        break;
    }
  };

  const typeParse = type => {
    switch (type) {
      case 'cut':
        return '/ 커트 ';
      case 'perm':
        return '/ 펌 ';
      case 'dye':
        return '/ 염색 ';
      default:
        break;
    }
  };
  const genderFormat = type => {
    switch (type) {
      case 'both':
        return '남자, 여자';
      case 'male':
        return '남자';
      case 'female':
        return '여자';
      default:
        break;
    }
  };

  let since = '';
  let until = '';
  let ableTimes = [];
  if (props.card) {
    props.card.ableTimes.forEach(ableTime => {
      since = `${parseInt(ableTime.since / 60, 10)}:${
        ableTime.since % 60 === 0 ? '00' : '30'
      }`;
      until = `${parseInt(ableTime.until / 60, 10)}:${
        ableTime.until % 60 === 0 ? '00' : '30'
      }`;
      ableTimes.push(since + ' ~ ' + until);
    });
  }

  let must = [];
  let no = [];
  if (props.card.must) {
    Object.entries(props.card.must).forEach(entry => {
      if (entry[1] === true) must.push(entry[0]);
    });
  }
  if (props.card.no) {
    Object.entries(props.card.no).forEach(entry => {
      if (entry[1] === true) no.push(entry[0]);
    });
  }

  let mustParse = '';
  let noParse = '';
  must.forEach(m => {
    mustParse += typeParse(m);
  });
  no.forEach(n => {
    noParse += typeParse(n);
  });
  mustParse = mustParse.substring(1);
  noParse = noParse.substring(1);
  if (!mustParse.length) mustParse = '없음';
  if (!noParse.length) noParse = '없음';
  return (
    <div className="col-6 p-0">
      <div className="schedule_card " style={{ color: '#1f3354' }}>
        <div className="d-flex">
          <div
            className=""
            style={{ color: '#1f3354', fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            <Moment format="MM/DD">{props.card && props.card.date}</Moment> (
            {dayOfWeek(props.card.date)})
          </div>
          <div className="" style={{ color: '#1f3354', fontSize: '1.3rem' }}>
            {ableTimes.map((ableTime, key) => (
              <p key={key} className="small m-1">
                {ableTime}
              </p>
            ))}
          </div>
          <div
            className="m-1 ml-auto"
            style={{ width: '1.6rem', height: '1.6rem' }}
          >
            {props.cancelCardHandler ? (
              <div
                onClick={() =>
                  props.cancelCardHandler(props.card._id, props.card._recruit)
                }
              >
                <img src={Delete} alt="alt" className="delete_button" />
              </div>
            ) : null}
          </div>
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          <span className="dcard_must">
            필수 : <span style={{ fontWeight: 'normal' }}>{mustParse}</span>
          </span>{' '}
          |{' '}
          <span className="dcard_no">
            불가 : <span style={{ fontWeight: 'normal' }}>{noParse}</span>
          </span>
        </div>
        <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          <span style={{ fontWeight: 'bold' }}>모델: </span>{' '}
          {genderFormat(props.card.requireGender)}
        </div>
        <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          <span style={{ fontWeight: 'bold' }}>헤어샵: </span> {props.card.shop}
        </div>
        <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
          <span style={{ fontWeight: 'bold' }}>사진촬영여부: </span>{' '}
          {props.card.picture}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
