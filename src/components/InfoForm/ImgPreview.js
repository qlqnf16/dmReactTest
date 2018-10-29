import React from 'react';

const ImgPreview = props => {
  let image = null;
  if (props.url) {
    image = (
      <img
        src={props.url}
        onClick={props.deletePortfolio}
        alt={props.url}
        style={props.style}
      />
    );
  }
  return image;
};

export default ImgPreview;
