import React, { Component, Fragment } from 'react';
import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';

class Favorites extends Component {
  render() {
    return (
      <Fragment>
        <MyPageNavigationBar />
        <div>찜</div>
      </Fragment>
    );
  }
}

export default Favorites;
