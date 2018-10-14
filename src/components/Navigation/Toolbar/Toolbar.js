import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";
import Navitems from "../Navitems/Navitems";
import MyModal from "../../UI/MyModal/MyModal";
import firebase from "../../../config/Firebase";
import { Link } from "react-router-dom";
import "./Toolbar.css";
import logo from "../../../assets/images/logo.png";
import tricolor from "../../../assets/images/tricolor.gif";

class Toolbar extends Component {
  state = {
    showLogin: false,
    showSignUp: false,
    rendering: false,
    LoginChange: false,
    isOpen: false
  };

  componentDidMount() {
    console.log(this.props);
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
        <Navbar light expand="lg" className="toolbar">
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand tag={Link} to={"/"}>
            <img className="logo" src={logo} alt="Main Logo" />
          </NavbarBrand>
          <img
            className="tricolor d-block d-lg-none"
            src={tricolor}
            alt="tricolor"
          />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Navitems
                showLogin={this.loginToggleHandler}
                showSignUp={this.signUpToggleHandler}
              />
            </Nav>
          </Collapse>
          <img
            className="tricolor d-none d-lg-block"
            src={tricolor}
            alt="tricolor"
          />
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
