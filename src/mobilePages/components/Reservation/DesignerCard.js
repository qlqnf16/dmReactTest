import React from 'react';
import DesignerCardImage from './DesignerCardImage';
import DesignerCardContent from './DesignerCardContent';

const DesignerCard = () => {
  const { containerStyle, imageStyle, contentStyle } = styles;
  return (
    <div style={containerStyle}>
      <div style={imageStyle}>
        <DesignerCardImage />
      </div>
      <DesignerCardContent />
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
