import React from 'react';

const FilterButton = () => {
  return <div style={buttonStyle}>필터검색</div>;
};

const buttonStyle = {
  width: '85%',
  height: '33px',
  borderRadius: '5px',
  boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
  border: 'solid 1px #dd6866',
  color: '#dd6866',
  fontWeight: 'bold',
  fontSize: '1.3rem',
  textAlign: 'center',
  lineHeight: '33px',
  margin: '2% 0 4% 0'
  // todo: click시 색상과 글자 색 반전되도록
};

export default FilterButton;
