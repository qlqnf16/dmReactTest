import React from 'react';

const ScheduleCard = props => (
  <div className="row">
    <div className="col-3">{props.date}</div>
    <div className="col-6">
      <p>{props.time}</p>
      <p>필수: {props.essential}</p>
      <p>{props.gender}</p>
    </div>
    <div className="col-3 text-right">
      <p>edit</p>
      <p>delete</p>
    </div>
  </div>
);

export default ScheduleCard;
