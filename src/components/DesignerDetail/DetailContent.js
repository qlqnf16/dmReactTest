import React from 'react';
import Review from './DetailContents/Review';
import BasicInfo from './DetailContents/BasicInfo';
import './DetailContent.css';
import MoreInfo from './DetailContents/MoreInfo';

const DetailContent = props => {
  const recruit = props.recruit;
  console.log(recruit);
  return (
    <div className="col-6">
      <BasicInfo recruit={recruit} designerData={props.designerData} />
      <MoreInfo
        portfolios={recruit.portfolios}
        designerData={props.designerData}
      />
      <div>
        <div className="dc_title">막내리뷰</div>
        <div className="dc__reviews">
          <span style={{ color: '#dd6866', fontWeight: 'bold' }}>
            ★
            {recruit._reviews &&
              recruit._reviews.reduce(
                (sum, review) => (sum += review['score']),
                0
              ) / recruit._reviews.length}
          </span>
          <span style={{ color: '#b2b2b2' }}> | </span>
          리뷰 {recruit._reviews.length}
        </div>
        {recruit._reviews.map(review => (
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
