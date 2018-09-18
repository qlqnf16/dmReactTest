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
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(() => {
            this.offHandler()
        })
    }

    loginToggleHandler = () => {
        this.setState({showLogin: !this.state.showLogin})
    }

    signUpToggleHandler = () => {
        this.setState({showSignUp: !this.state.showSignUp})
    }

    switchHandler = () => {
        this.setState({showSignUp: !this.state.showSignUp, showLogin: !this.state.showLogin})
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
                    toggle={this.switchHandler} 
                    modalType="Login" 
                    modalTitle="로그인"
                    modalText="아직 드리머리 회원이 아니신가요?"
                />
                <MyModal 
                    showLogin={this.state.showSignUp} 
                    off={this.signUpToggleHandler} 
                    toggle={this.switchHandler} 
                    modalType="Sign Up"
                    modalTitle="환영합니다!"
                    modalSubtitle="간단한 회원가입으로 서비스를 이용해 보세요"
                    modalText="이미 드리머리 계정이 있나요?" 
                />
            </div>
        )
        
    }
}

export default Toolbar