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
import './Navitems.css';
import message_x from '../../../assets/images/message_x.png';

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
            <NavLink tag={Link} to={'/designerList'} className="">
              예디찾기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/addDesigner'} className="">
              예디등록
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="">
              반갑습니다 {this.props.userData.name}님
            </DropdownToggle>
            <DropdownMenu right className="dropdownMenu">
              <DropdownItem>
                <NavLink tag={Link} to={'/reservations'}>
                  마이페이지
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink onClick={this.logout}>로그아웃</NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavItem>
            <NavLink>
              포인트 : {this.props.userData.point}
              point
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/message'} className=" message_img">
              <img alt="alt" src={message_x} style={{ width: '100%' }} />
            </NavLink>
          </NavItem>
        </Fragment>
      );
      // 로그인 했는지 && 디자이너인지 확인 후 디자이너용 navbar
    } else if (this.props.userData.uid && this.props.userData.isD) {
      return (
        <Fragment>
          <NavItem>
            <NavLink tag={Link} to={'/designer/whydreamary'} className="">
              왜?
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/reservations'} className="">
              예약관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/schedule'} className="">
              스케줄등록
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/ticket'} className="">
              이용권관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/info'} className="">
              회원정보관리
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designer/coupon'} className="">
              프로모션
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/message'} className=" message_img">
              <img alt="alt" src={message_x} style={{ width: '100%' }} />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logout} className="">
              로그아웃
            </NavLink>
          </NavItem>
        </Fragment>
      );
      // 로그인 안했으면, 비회원 navbar
    } else {
      return (
        <Fragment>
          <NavItem>
            <NavLink tag={Link} to={'/about'} className="">
              드리머리 소개
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.showSignUp} className="">
              회원가입
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.showLogin} className="">
              로그인
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/designerList'} className="">
              예디찾기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.props.showLogin} className="">
              예디등록
            </NavLink>
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
