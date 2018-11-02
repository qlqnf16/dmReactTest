import React from 'react';
import Review from './DetailContents/Review';
import BasicInfo from './DetailContents/BasicInfo';
import './DetailContent.css';
import MoreInfo from './DetailContents/MoreInfo';

const DetailContent = props => {
  const recruit = props.recruit;
  return (
    <React.Fragment>
      <div className="col-7 row">
        <div className="col-3">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundImage: `url(${props.designerData.profile})`,
              backgroundSize: 'cover',
              margin: '0 auto'
            }}
          />
        </div>
        <div className="col-9">
          <BasicInfo recruit={recruit} designerData={props.designerData} />
          <MoreInfo
            recruit={recruit}
            designerData={props.designerData}
            showLargeImageToggle={props.showLargeImageToggle}
          />
          <div>
            <div className="dc_title">예디리뷰</div>
            <div className="dc__reviews">
              <span style={{ color: '#dd6866', fontFamily: 'NanumSquareEB' }}>
                ★{recruit.score}
              </span>
              <span style={{ color: '#b2b2b2' }}> | </span>
              리뷰 {recruit._reviews.length}
            </div>
            {recruit._reviews.map((review, key) => (
              <Review
                key={key}
                review={review}
                showLargeImageToggle={props.showLargeImageToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailContent;
