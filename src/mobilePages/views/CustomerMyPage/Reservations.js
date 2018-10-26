import React, { Component, Fragment } from 'react';
import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';

class Reservations extends Component {
  render() {
    return (
      <Fragment>
        <MyPageNavigationBar />
        <div>예약</div>
      </Fragment>
    );
  }
}

export default Reservations;
