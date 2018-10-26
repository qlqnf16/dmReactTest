import React from 'react';
import StarRatings from 'react-star-ratings';

const DesignerCardContent = props => {
  const {
    containerStyle,
    locationStyle,
    titleStyle,
    nameStyle,
    starStyle
  } = styles;

  const recruit = props.recruit;
  console.log(recruit);
  return (
    <div style={containerStyle}>
      <h5 style={locationStyle}>샵 이름 넣기</h5>
      <h3 style={titleStyle}>{recruit.title}</h3>
      <h6 style={nameStyle}>
        {recruit._designer.name}{' '}
        <span style={starStyle}>
          <StarRatings
            rating={recruit.score}
            starDimension="1.1rem"
            starSpacing="1px"
            starRatedColor="#dd6866"
            starEmptycolor="#ffffff"
          />
        </span>
        <span style={{ color: 'gray' }}>({recruit.score})</span>
      </h6>
    </div>
  );
};

const styles = {
  containerStyle: {
    paddingTop: '5%'
  },
  locationStyle: {
    fontSize: '1.1rem',
    color: '#2b2e34',
    marginBottom: 4
  },
  titleStyle: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1e3354',
    marginBottom: 4
  },
  nameStyle: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#2b2e34',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  starStyle: {
    marginLeft: '2%',
    color: '#dd6866',
    fontSize: '1.1rem'
  }
};

export default DesignerCardContent;
