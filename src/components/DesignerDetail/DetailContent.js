import React from 'react';
import Review from './DetailContents/Review';
import BasicInfo from './DetailContents/BasicInfo';
import './DetailContent.css';
import MoreInfo from './DetailContents/MoreInfo';

const DetailContent = props => {
  const recruit = props.recruit;
  console.log(props);
  return (
    <React.Fragment>
      <div className="col-12 col-md-7 row">
        <div className="col-md-2">
          <div>사진</div>
        </div>
        <div className="col-md-10">
          <BasicInfo recruit={recruit} designerData={props.designerData} />
          <MoreInfo recruit={recruit} designerData={props.designerData} />
          <div>
            <div className="dc_title">막내리뷰</div>
            <div className="dc__reviews">
              <span style={{ color: '#dd6866', fontFamily: 'NanumSquareEB' }}>
                ★{recruit.score}
              </span>
              <span style={{ color: '#b2b2b2' }}> | </span>
              리뷰 {recruit._reviews.length}
            </div>
            {recruit._reviews.map((review, key) => (
              <Review key={key} review={review} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailContent;
