import React from 'react';
import DesignerCard from './DesignerCard';

const DesignerCardList = () => {
  return (
    <div style={containerStyle}>
      <DesignerCard />
      <DesignerCard />
      <DesignerCard />
      <DesignerCard />
      <DesignerCard />
    </div>
  );
};

const containerStyle = {
  width: '85%',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'space-between'
};

export default DesignerCardList;
