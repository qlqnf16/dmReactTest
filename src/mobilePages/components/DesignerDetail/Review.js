import React from 'react';
import Moment from 'react-moment';

import StarRatings from 'react-star-ratings';

const Review = props => {
  const { paragraphStyle, starStyle, reviewAuthorStyle } = styles;
  const review = props.review;
  const images =
    review.images &&
    review.images.map((img, key) => (
      <img
        src={img}
        key={key}
        alt="img"
        className="col-4 w-100 h-100"
        onClick={() => props.showLargeImageToggle(img)}
      />
    ));

  return (
    <div>
      <div style={reviewAuthorStyle}>
        {review._user.name}
        <span style={starStyle}>
          <StarRatings
            rating={review.score}
            starDimension="13px"
            starSpacing="1px"
            starRatedColor="#dd6866"
            starEmptycolor="#ffffff"
          />
        </span>
      </div>
      <div style={paragraphStyle}>
        <Moment format="YYYY/MM/DD">{review.createdAt}</Moment>
      </div>
      <pre style={{ ...paragraphStyle, margin: '1rem 0' }}>
        {review.content}
      </pre>
      <div>{images}</div>
    </div>
  );
};

const styles = {
  reviewAuthorStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#2b2e34',
    paddingTop: '2.2rem'
  },
  starStyle: {
    fontSize: '1.1rem',
    color: '#dd6866',
    marginLeft: '0.4rem'
  },
  paragraphStyle: {
    fontSize: '1.3rem',
    color: '#2b2e34'
  }
};

export default Review;
