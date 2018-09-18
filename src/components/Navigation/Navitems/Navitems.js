import React, { Component, Fragment } from 'react';
import { NavItem, NavLink, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navitems extends Component {
    render() {
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
                    <NavLink tag={Link} to={"/addDesigner"}>막내등록</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    안녕하세요 신한결님!
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <Link to='/reservations'>마이페이지</Link>
                        </DropdownItem>
                        <DropdownItem>
                            로그아웃
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Fragment>
        )
    }
}

export default Navitems