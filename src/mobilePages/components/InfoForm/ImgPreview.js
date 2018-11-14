import React from 'react';
import ExifOrientationImg from 'react-exif-orientation-img';

const ImgPreview = props => {
  let image = null;
  if (props.url) {
    image = (
      <ExifOrientationImg
        style={props.style}
        src={props.url}
        onClick={props.deletePortfolio}
        alt={props.url}
      />
    );
  }
  return image;
};

export default ImgPreview;
