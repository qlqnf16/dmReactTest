import React from 'react';

const CardAdd = props => {
  const Times = [];
  props.ableTimes.map(ableTime => {
    let time = ableTime.since;
    while (time <= ableTime.until - 90) {
      let timeFormat = `${parseInt(time / 60)} : ${
        time % 60 === 0 ? '00' : '30'
      }`;
      Times.push(timeFormat);
      time += 30;
    }
  });
  let timeButtons = null;
  timeButtons = Times.map(time => (
    <div className="btn btn-sm btn-light border-0 p-0 col-md-6">
      <p>{time}</p>
    </div>
  ));

  console.log(Times);
  return (
    <div>
      {/* <h5 className="small">필수 : {props.must}</h5>
			<h5 className="small">거부 : {props.no}</h5> */}
      <div className="row">
        <div className="col-md-4 btn btn-light btn-sm">컷트</div>
        <div className="col-md-4 btn btn-light btn-sm">염색</div>
        <div className="col-md-4 btn btn-light btn-sm">펌</div>
      </div>
      <h5 className="small row">{timeButtons}</h5>
      <h5 className="small">필터</h5>
    </div>
  );
};

export default CardAdd;
