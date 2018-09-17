import React, { Component, Fragment } from 'react';
import { NavItem, NavLink, DropdownItem, DropdownToggle, DropdownMenu, UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';

class Navitems extends Component {
    render() {
        return (
            <Fragment>
                <NavItem>
                    <Link to="/about"><NavLink>드리머리 소개</NavLink></Link>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.props.showSignUp}>회원가입</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink onClick={this.props.showLogin}>로그인</NavLink>
                </NavItem>
                <NavItem>
                    <Link to="/designerList"><NavLink>막내찾기</NavLink></Link>
                </NavItem>
                <NavItem>
                    <Link to="/addDesigner"><NavLink>막내등록</NavLink></Link>
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