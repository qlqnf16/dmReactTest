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
    <div style={containerStyle}>
      <div
        style={{
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '1.8rem' }}>
          <Moment format="MM/DD">{props.card && props.card.date}</Moment> (
          {dayOfWeek(props.card.date)})
        </div>
        <div
          style={{
            paddingBottom: '5%',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            marginBottom: '5%'
          }}
        >
          {ableTimes.map((ableTime, key) => (
            <div key={key}>{ableTime}</div>
          ))}
        </div>
        <div style={{ color: '#4c91ba' }}>
          <span className="font-weight-bold">필수 :</span>
          {mustParse}
        </div>
        <div style={{ color: '#dd6866' }}>
          <span className="font-weight-bold">불가 :</span>
          {noParse}
        </div>
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly'
        }}
      >
        <div className="row">
          <div className="col-6 font-weight-bold">모델성별</div>
          <div className="col-6 px-0">
            {genderFormat(props.card.requireGender)}
          </div>
        </div>
        <div className="row">
          <div className="col-6 font-weight-bold">헤어샵</div>
          <div className="col-6 px-0">{props.card.shop}</div>
        </div>
        <div className="row">
          <div className="col-6 font-weight-bold">사진촬영</div>
          <div className="col-6 px-0">{props.card.picture}</div>
        </div>
      </div>
      <div style={{ width: '5%' }}>
        {props.cancelCardHandler ? (
          <div
            onClick={() =>
              props.cancelCardHandler(props.card._id, props.card._recruit)
            }
          >
            <img src={Delete} alt="alt" style={{ width: '100%' }} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const styles = {
  containerStyle: {
    height: 130,
    borderRadius: 5,
    border: 'solid 1px rgba(0, 0, 0, 0.1)',
    fontSize: '1.2rem',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5%',
    marginBottom: '5%',
    color: 'rgb(31, 51, 84)'
  }
};

const { containerStyle } = styles;

export default ScheduleCard;
