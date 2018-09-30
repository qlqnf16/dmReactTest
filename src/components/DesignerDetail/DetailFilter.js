import React from 'react';

const DetailFilter = props => {
  return (
    <div className="border col-3">
      <h1> 날짜, 시간 필터를 넣자 </h1>
      <h4>
        {props.time.since} - {props.time.until}
      </h4>
    </div>
  );
};

export default DetailFilter;
