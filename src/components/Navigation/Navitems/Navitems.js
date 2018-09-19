import React, { Component, Fragment } from 'react';
import { NavItem, NavLink, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../../config/Firebase'


console.log(firebase.auth().currentUser)
class Navitems extends Component {

    logout() {
        firebase.auth().signOut();
    }

    render() {
        console.log("Navitems rendering")
        if(this.props.user){

            return (
                <Fragment>
                    <NavItem>
                        <NavLink tag={Link} to={"/about"} >드리머리 소개</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/designerList"}>막내찾기</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/addDesigner"}>막내등록</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        안녕하세요 {firebase.auth().currentUser.displayName}님
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <NavLink tag={Link} to={'/reservations'}>마이페이지</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink onClick={this.logout}>LogOut</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <NavItem>
                        <NavLink tag={Link} to={"/about"} >드리머리 소개</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.props.showSignUp}>회원가입</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.props.showLogin}>로그인</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to={"/designerList"}>막내찾기</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.props.showLogin}>막내등록</NavLink>
                    </NavItem>
                </Fragment>
            )
        }
    }
}

export default Navitems