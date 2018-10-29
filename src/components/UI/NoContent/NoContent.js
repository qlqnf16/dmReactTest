import React from 'react';
import { Link } from 'react-router-dom';
import './NoContent.css';

const NoContent = props => {
  return (
    <Link to={props.link} className="noContent">
      아직 예약이 없습니다.
      <br />
      {props.text}
    </Link>
  );
};

export default NoContent;
