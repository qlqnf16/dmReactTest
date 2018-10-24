import React, { Component, Fragment } from 'react';
import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';

class UserInfo extends Component {
  render() {
    return (
      <Fragment>
        <MyPageNavigationBar />
        <div>UserInfo</div>
      </Fragment>
    );
  }
}

export default UserInfo;
