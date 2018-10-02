import React, { Component, Fragment } from 'react';
import {
  NavItem,
  NavLink,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../../config/Firebase';

import { connect } from 'react-redux';

class Navitems extends Component {
  logout() {
    firebase.auth().signOut();
  }

  render() {
    // 로그인 했는지 && 디자이너가 아닌지 확인 후 고객용 navbar
    if (this.props.userData.uid && !this.props.userData.isD) {
      return (
        <Fragment>
          <NavItem>
            <NavLink tag={Link} to={'/about'}>
              드리머리 소개
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designerList'}>
              막내찾기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/addDesigner'}>
              막내등록
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              안녕하세요 {this.props.userData.name}님
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavLink tag={Link} to={'/reservations'}>
                  마이페이지
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink onClick={this.logout}>LogOut</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Fragment>
      );
      // 로그인 했는지 && 디자이너인지 확인 후 디자이너용 navbar
    } else if (this.props.userData.uid && this.props.userData.isD) {
      return (
        <Fragment>
          <NavItem>
            <NavLink tag={Link} to={'/designer/whydreamary'}>
              왜?
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/reservations'}>
              예약관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/schedule'}>
              스케줄등록
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/ticket'}>
              이용권관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/info'}>
              회원정보관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/coupon'}>
              추천인/쿠폰
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logout}>로그아웃</NavLink>
          </NavItem>
        </Fragment>
      );
      // 로그인 안했으면, 비회원 navbar
    } else {
      return (
        <Fragment>
          <NavItem>
            <NavLink tag={Link} to={'/about'}>
              드리머리 소개
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.showSignUp}>회원가입</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.showLogin}>로그인</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designerList'}>
              막내찾기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.showLogin}>막내등록</NavLink>
          </NavItem>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(Navitems);
