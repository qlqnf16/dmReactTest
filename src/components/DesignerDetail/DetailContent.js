import React from 'react';
import Review from './Review';

const DetailContent = props => (
  <div className="border col-9">
    <h1 className="m-4"> 디자이너 정보를 넣자 </h1>
    <div className="m-4">
      <h3>자기소개</h3>
      <h4>{props.introduce}</h4>
    </div>
    <div className="m-4">
      <h3>막내정보</h3>
      <h4>{props.data}</h4>
    </div>
    <div className="m-4">
      <h3>리뷰들</h3>
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

export default DetailContent;
