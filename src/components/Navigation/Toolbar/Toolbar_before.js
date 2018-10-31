import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import Navitems from '../Navitems/Navitems';
import MyModal from '../../UI/MyModal/MyModal';
import firebase from '../../../config/Firebase';
import './Toolbar.css';
import logo from '../../../assets/images/logo.png';
import tricolor from '../../../assets/images/tricolor.gif';

class Toolbar extends Component {
  state = {
    showLogin: false,
    showSignUp: false,
    rendering: false,
    LoginChange: false,
    isOpen: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      this.offHandler();
      this.setState({
        ...this.state,
        LoginChange: !this.state.LoginChange
      });
    });
    this.setState({
      ...this.state,
      rendering: true
    });
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   // 첫 렌더링이 완료가 됐는지
  //   const isRendering = this.state.rendering !== nextState.rendering;
  //   // Loing 또는 SingUp의 show 상태가 변화 했는지
  //   const isChangeShowState =
  //     this.state.showLogin !== nextState.showLogin ||
  //     this.state.showSignUp !== nextState.showSignUp;
  //   const isLoginChange = this.state.LoginChange !== nextState.LoginChange;
  //   // 하나라도 변화 했다면, true 반환 => 리렌더링
  //   return isRendering || isChangeShowState || isLoginChange;
  // };

  loginToggleHandler = () => {
    this.setState({ showLogin: !this.state.showLogin });
  };

  signUpToggleHandler = () => {
    this.setState({ showSignUp: !this.state.showSignUp });
  };

  offHandler = () => {
    this.setState({ showSignUp: false, showLogin: false });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Navbar
          light
          expand="lg"
          className="toolbar"
          style={{ paddingRight: 0 }}
        >
          <NavbarBrand tag={Link} to={'/'}>
            <img className="logo" src={logo} alt="Main Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Navitems
                showLogin={this.loginToggleHandler}
                showSignUp={this.signUpToggleHandler}
              />
            </Nav>
            <img className="tricolor" src={tricolor} alt="tricolor" />
          </Collapse>
        </Navbar>
        <MyModal
          showLogin={this.state.showLogin}
          off={this.loginToggleHandler}
          type="login"
        />
        <MyModal
          showLogin={this.state.showSignUp}
          off={this.signUpToggleHandler}
          type="signUp"
        />
      </div>
    );
  }
}

export default Toolbar;
