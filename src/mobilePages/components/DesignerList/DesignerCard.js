import React from 'react';
import { Link } from 'react-router-dom';

import DesignerCardImage from './DesignerCardImage';
import DesignerCardContent from './DesignerCardContent';

const DesignerCard = props => {
  const { containerStyle, imageStyle } = styles;
  return (
    <div style={containerStyle}>
      <Link to={`designerdetail/${props.recruit._id}`}>
        <div style={imageStyle}>
          <DesignerCardImage />
        </div>
        <DesignerCardContent recruit={props.recruit} />
      </Link>
    </div>
  );
};

const styles = {
  containerStyle: {
    width: '48%',
    marginBottom: '3%'
  },
  imageStyle: {
    width: '100%',
    height: '134px'
  }
};

export default DesignerCard;
