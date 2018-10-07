import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

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
      case 7:
        return '일';
      default:
        break;
    }
  };

  const typeParse = type => {
    switch (type) {
      case 'cut':
        return '/ 컷트 ';
      case 'perm':
        return '/ 펌 ';
      case 'dye':
        return '/ 염색 ';
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
  Object.entries(props.card.must).forEach(entry => {
    if (entry[1] === true) must.push(entry[0]);
  });
  Object.entries(props.card.no).forEach(entry => {
    if (entry[1] === true) no.push(entry[0]);
  });

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
  return (
    <div className="border col-md-6">
      <div className="row">
        <div className="col-5">
          <Moment format="MM/DD">{props.card && props.card.date}</Moment> (
          {dayOfWeek(props.card.date)})
        </div>
        <div className="col-7">
          {ableTimes.map((ableTime, key) => (
            <p key={key} className="small my-1">
              {ableTime}
            </p>
          ))}
        </div>
      </div>
      <p className="my-1">
        필수: {mustParse} | 불가 : {noParse}
      </p>
      <p className="my-1">{props.card.requireGender}</p>
      <p className="my-1">{props.card.shop}</p>
      <div className="my-1">
        <div
          onClick={() =>
            props.cancelCardHandler(props.card._id, props.card._recruit._id)
          }
          className="btn btn-danger"
        >
          삭제
        </div>
        <div className="btn btn-primary">수정</div>
      </div>
    </div>
  );
};

export default ScheduleCard;
