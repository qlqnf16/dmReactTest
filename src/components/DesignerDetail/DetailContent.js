import React from 'react';
import Review from './DetailContents/Review';
import BasicInfo from './DetailContents/BasicInfo';
import './DetailContent.css';
import MoreInfo from './DetailContents/MoreInfo';

const DetailContent = props => {
  return (
    <div className="col-6">
      <BasicInfo data={props.data} />
      <MoreInfo portfolios={props.portfolios} />
      <div>
        <div className="dc_title">막내리뷰</div>
        <div className="dc_reviews">
          <span style={{ color: '#dd6866', fontWeight: 'bold' }}>
            ★
            {props.reviews.reduce(
              (sum, review) => (sum += review['score']),
              0
            ) / props.reviews.length}
          </span>
          <span style={{ color: '#b2b2b2' }}> | </span>
          리뷰 {props.reviews.length}
        </div>
        {props.reviews.map(review => (
          <Review
            name={review._user.name}
            date={review.createdAt}
            star={review.score}
            content={review.content}
            key={review._id}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailContent;
