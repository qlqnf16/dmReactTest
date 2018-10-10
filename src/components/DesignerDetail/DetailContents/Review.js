import React from 'react';
import StarRatings from 'react-star-ratings';
import './Review.css';

const Review = props => {
  const time = new Date(props.date * 1000);
  const month = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  console.log(time);

  return (
    <div className='r_box'>
      <div className="r_top">
        <div
          className="r_content"
          style={{ fontWeight: 'bold', margin: '0 6.8px 0 0' }}
        >
          이름이
          {props.name}
        </div>
        <StarRatings
          rating={props.star}
          starDimension="13px"
          starSpacing="1px"
          starRatedColor="#dd6866"
          starEmptycolor="#ffffff"
        />
      </div>
      <div className="r_content">
        {`${time.getFullYear()}/${month[time.getMonth()]}/${time.getDate()}`}
      </div>
      <div className="r_content" style={{ marginTop: '22px' }}>
        {props.content}
      </div>
    </div>
  );
};

export default Review;
