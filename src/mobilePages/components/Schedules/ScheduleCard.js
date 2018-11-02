import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import Delete from '../../../assets/images/delete.png';

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
    <div>
      <div>
        <div>
          <Moment format="MM/DD">{props.card && props.card.date}</Moment> (
          {dayOfWeek(props.card.date)})
        </div>
        <div>
          {ableTimes.map((ableTime, key) => (
            <div key={key}>{ableTime}</div>
          ))}
        </div>
        <div>
          {props.cancelCardHandler ? (
            <div
              onClick={() =>
                props.cancelCardHandler(props.card._id, props.card._recruit)
              }
            >
              <img src={Delete} alt="alt" style={{ width: '2%' }} />
            </div>
          ) : null}
        </div>
      </div>
      <div>
        필수 : {mustParse} | 불가 :{noParse}
      </div>
      <div>모델: {genderFormat(props.card.requireGender)}</div>
      <div>헤어샵: {props.card.shop}</div>
      <div>사진촬영여부: {props.card.picture}</div>
    </div>
  );
};

export default ScheduleCard;
