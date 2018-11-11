import React from 'react';

const Header = () => {
  const { containerStyle, titleStyle, contentStyle } = styles;
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>3단계: 서비스 받기</h2>
      <p style={contentStyle}>
        약속된 시간에 예디의 헤어샵에서 <br /> 맞춤 서비스 받기
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
      'linear-gradient(to right, #c4dbe9, #c8dde9 10%, #cde0e8 20%, #d2e3e8 30%, #d8e6e7 40%, #dee9e7 50%, #e4ece6 60%, #ebf0e5 70%, #f1f3e4 80%, #f8f7e4 90%, #fffae3)'
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
