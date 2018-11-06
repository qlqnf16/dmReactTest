import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from 'reactstrap';
import Navitems from '../Navitems/Navitems';
import MyModal from '../../UI/MyModal/MyModal';
import firebase from '../../../config/Firebase';
import { Link } from 'react-router-dom';
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

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
        <Navbar light expand className="toolbar">
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand tag={Link} to={'/'}>
            <img className="logo" src={logo} alt="Main Logo" />
          </NavbarBrand>
          {/* <div
            style={{
              position: 'absolute',
              display: 'flex',
              zIndex: '999',
              width: '280px',
              padding: '1%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
              borderRadius: '5px',
              borderColor: 'white',
              left: '5%',
              top: '85%'
            }}
          >
            <div style={{ marginRight: '5%', fontSize: '2.5rem' }}>⚠</div>{' '}
            디자이너 등록 기간입니다.
            <br />
            일부 기능이 작동하지 않을 수 있습니다.
          </div> */}
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Navitems
                showLogin={this.loginToggleHandler}
                showSignUp={this.signUpToggleHandler}
              />
            </Nav>
          </Collapse>
          <img className="tricolor" src={tricolor} alt="tricolor" />
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
