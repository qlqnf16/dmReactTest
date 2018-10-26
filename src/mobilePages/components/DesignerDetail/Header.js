import React from 'react';

const Header = () => {
  const { containerStyle, titleStyle, contentStyle } = styles;
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>2단계: 예약하기</h2>
      <p style={contentStyle}>
        가장 마음에 드는 예디 선택 후 <br /> 알맞은 날짜와 시간 정해서 예약 및
        결제하기
      </p>
    </div>
  );
};

const styles = {
  containerStyle: {
    width: '100%',
    height: '120px',
    padding: '8% 15%',
    backgroundImage:
      'linear-gradient(to right, #f8cfc9, #f5cfcb 10%, #f0d1ce 20%, #ecd2d1 30%, #e7d3d4 40%, #e1d4d7 50%, #dcd6db 60%, #d6d7de 70%, #d0d9e2 80%, #cadae6 90%, #c4dbe9)'
  },
  titleStyle: {
    fontWeight: 'bold',
    color: '#1e3354',
    textAlign: 'left'
  },
  contentStyle: {
    fontSize: '1.2rem',
    color: '#2b2e34',
    lineHeight: 1.2,
    marginTop: '5%'
  }
};

export default Header;
