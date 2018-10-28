import React from 'react';
import StarRatings from 'react-star-ratings';
import './Review.css';
import Moment from 'react-moment';

const Review = props => {
  const review = props.review;
  console.log(review);
  const images = review.images && review.images.map(img => <img src={img} />);

  return (
    <div className="r_box">
      <div className="r_top">
        <div
          className="r_content"
          style={{ fontFamily: 'NanumSquareEB', margin: '0 6.8px 0 0' }}
        >
          {review._user.name}
        </div>
        <StarRatings
          rating={review.score}
          starDimension="13px"
          starSpacing="1px"
          starRatedColor="#dd6866"
          starEmptycolor="#ffffff"
        />
      </div>
      <div className="r_content">
        <Moment format="YYYY/MM/DD">{review.createdAt}</Moment>
        {/* {`${time.getFullYear()}/${month[time.getMonth()]}/${time.getDate()}`} */}
      </div>
      <div className="r_content" style={{ marginTop: '22px' }}>
        {review.content}
      </div>
      <div>{images}</div>
    </div>
  );
};

export default Review;
