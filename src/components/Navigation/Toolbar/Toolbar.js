import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { Link } from 'react-router-dom'
import Navitems from '../Navitems/Navitems'
import MyModal from '../../UI/MyModal/MyModal';
import firebase from '../../../config/Firebase'

class Toolbar extends Component {
    state = {
        showLogin: false,
        showSignUp: false,
        rendering: false,
        LoginChange : false,
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(() => {
            this.offHandler()
            this.setState({
                ...this.state,
                LoginChange : !this.state.LoginChange,
            })
        })
        this.setState({
            ...this.state,
            rendering: true
        })
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        const isRendering = this.state.rendering !== nextState.rendering
        const isChangeShowState = this.state.showLogin !== nextState.showLogin || this.state.showSignUp !== nextState.showSignUp
        const isLoginChange = this.state.LoginChange !== nextState.LoginChange
        return isRendering || isChangeShowState || isLoginChange
    }
    

    loginToggleHandler = () => {
        this.setState({showLogin: !this.state.showLogin})
    }

    signUpToggleHandler = () => {
        this.setState({showSignUp: !this.state.showSignUp})
    }

    offHandler = () => {
        this.setState({showSignUp: false, showLogin: false})
        
    }

    render() {
        console.log("Toolbar rendering")
        return(
            <div>
                <Navbar color='light' light expand='lg'>
                    <NavbarBrand tag={Link} to={"/"}>Dreamary</NavbarBrand>
                    <Nav className='ml-auto' navbar>
                        <Navitems 
                            showLogin={this.loginToggleHandler} 
                            showSignUp={this.signUpToggleHandler} 
                            user={firebase.auth().currentUser}
                        />
                    </Nav>
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
        )
        
    }
}

export default Toolbar