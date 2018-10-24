import React from 'react';

const DesignerCardContent = () => {
  const {
    containerStyle,
    locationStyle,
    titleStyle,
    nameStyle,
    starStyle
  } = styles;
  return (
    <div style={containerStyle}>
      <h5 style={locationStyle}>박준뷰티랩 청담본점</h5>
      <h3 style={titleStyle}>막내는 나야 나! 나야 나!</h3>
      <h6 style={nameStyle}>
        이태훈 <span style={starStyle}>★★★★★</span>
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
