import React from 'react';

const ImgPreview = props => {
  let image = null;
  if (props.url) {
    image = (
      <img
        src={props.url}
        className="col-4"
        onClick={props.deletePortfolio}
        alt={props.url}
      />
    );
  }
  return image;
};

export default ImgPreview;
