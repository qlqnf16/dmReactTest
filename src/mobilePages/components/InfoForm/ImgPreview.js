import React from 'react';

const ImgPreview = props => {
  let image = null;
  if (props.url) {
    image = (
      <img
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
