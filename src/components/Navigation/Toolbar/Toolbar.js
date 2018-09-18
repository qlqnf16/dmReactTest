import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { Link } from 'react-router-dom'
import Navitems from '../Navitems/Navitems'
import MyModal from '../../UI/MyModal/MyModal';

class Toolbar extends Component {
    state = {
        showLogin: false,
        showSignUp: false
    }

    loginToggleHandler = () => {
        this.setState({showLogin: !this.state.showLogin})
    }

    signUpToggleHandler = () => {
        this.setState({showSignUp: !this.state.showSignUp})
    }

    switchHandler = () => {
        this.setState({showSignUp: !this.state.showSignUp})
        this.setState({showLogin: !this.state.showLogin})
    }

    render() {
        return(
            <div>
                <Navbar color='light' light expand='lg'>
                    <NavbarBrand tag={Link} to={"/"}>Dreamary</NavbarBrand>
                    <Nav className='ml-auto' navbar>
                        <Navitems showLogin={this.loginToggleHandler} showSignUp={this.signUpToggleHandler} />
                    </Nav>
                </Navbar>
                <MyModal showLogin={this.state.showLogin} off={this.loginToggleHandler} toggle={this.switchHandler} modalTitle="Login" modalText="로그인화면"/>
                <MyModal showLogin={this.state.showSignUp} off={this.signUpToggleHandler} toggle={this.switchHandler} modalTitle="Sign Up" modalText="회원가입화면" />
            </div>
        )
    }
}

export default Toolbar