import React from 'react';

const Header = () => {
  const { containerStyle, titleStyle, contentStyle } = styles;
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>1단계: 막내 찾기</h2>
      <p style={contentStyle}>
        원하는 지역, 스타일, 시간대에 <br /> 서비스가 가능한 막내들 한 눈에 보기
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
      'linear-gradient(to right, #fffae3, #fef8e1 10%, #fef4df 20%, #fdf0dd 30%, #fcecda 40%, #fce7d7 50%, #fbe3d5 60%, #faded2 70%, #f9d9cf 80%, #f9d4cc 90%, #f8cfc9)'
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
