import React, { Component, Fragment } from 'react';
import './SideDrawer.css';
import MyModal from '../../../components/UI/MyModal/MyModal';
import DrawerItems from './DrawerItems';
import { connect } from 'react-redux';
import firebase from '../../../config/Firebase';

class SideDrawer extends Component {
  state = {
    showLogin: false,
    showSignUp: false
  };

  loginToggleHandler = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  signUpToggleHandler = () => {
    this.setState({ showSignUp: !this.state.showSignUp });
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <Fragment>
        <DrawerItems
          click={this.props.click}
          show={this.props.show}
          loginToggleHandler={this.loginToggleHandler}
          signUpToggleHandler={this.signUpToggleHandler}
          logout={this.logout}
          userData={this.props.userData}
          finishRedux={this.props.finishRedux}
        />
        <MyModal
          showLogin={this.state.showLogin}
          off={this.loginToggleHandler}
          type="login"
          click={this.props.click}
        />
        <MyModal
          showLogin={this.state.showSignUp}
          off={this.signUpToggleHandler}
          type="signUp"
          click={this.props.click}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(SideDrawer);
