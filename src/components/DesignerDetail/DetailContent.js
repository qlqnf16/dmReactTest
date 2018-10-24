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
      <div className="col-7 row">
        <div className="col-3">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundImage:
                "url('https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/p320x320/41919264_1877230375677448_1271242630931415040_n.jpg?_nc_cat=109&oh=ae32b92623fca50f7b7eddd0d84cf4b7&oe=5C6297D7')",
              backgroundSize: 'cover',
              margin: '0 auto'
            }}
          />
        </div>
        <div className="col-9">
          <BasicInfo recruit={recruit} designerData={props.designerData} />
          <MoreInfo recruit={recruit} designerData={props.designerData} />
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
              <Review key={key} review={review} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailContent;
