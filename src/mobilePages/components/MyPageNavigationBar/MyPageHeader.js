import React from 'react';

const MyPageHeader = () => {
  return <div style={styles.headerStyle}>마이페이지</div>;
};

const styles = {
  headerStyle: {
    width: '100%',
    height: '40px',
    // todo: bgColor should changed with isDesigner boolean.
    backgroundColor: '#dd6866',
    textAlign: 'center',
    lineHeight: '40px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.4rem'
  }
};

export default MyPageHeader;
