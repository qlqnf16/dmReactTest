import React from 'react';

const MyPageNavigationItems = props => {
  return (
    <div
      style={
        props.active
          ? { ...styles.itemStyle, ...styles.activeStyle }
          : styles.itemStyle
      }
    >
      {props.children}
    </div>
  );
};

const styles = {
  itemStyle: {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '1rem',
    fontWeight: 'bold',
    paddingBottom: '5px',
    transform: 'translateY(4.5px)'
  },
  activeStyle: {
    color: '#1f3354',
    borderBottom: 'solid 1.8px #1f3354'
  }
};

export default MyPageNavigationItems;
