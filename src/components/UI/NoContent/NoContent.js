import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './NoContent.css';

const NoContent = props => {
  return (
    <Fragment>
      {props.link ? (
        <Link to={props.link} className="noContent">
          아직 예약이 없습니다.
          <br />
          {props.text}
        </Link>
      ) : (
        <div className="noContent">스케줄을 등록해주세요.</div>
      )}
    </Fragment>
  );
};

export default NoContent;
