import React, { Component, Fragment } from 'react';
import Header from '../components/Reservation/Header';
import FilterButton from '../components/Reservation/FilterButton';
import DesignerCardList from '../components/Reservation/DesignerCardList';

class DesignerList extends Component {
  render() {
    return (
      <div style={containerStyle}>
        <Header />
        <FilterButton />
        <DesignerCardList />
      </div>
    );
  }
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

export default DesignerList;
