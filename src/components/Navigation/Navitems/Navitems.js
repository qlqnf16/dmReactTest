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
  state = {
    newMessage: false
  };

  async componentDidMount(prevProps, prevState) {
    if (
      this.props.userData.uid &&
      this.props.userData._reservations &&
      this.props.userData._reservations.length
    ) {
      const promises = [];
      this.props.userData._reservations.forEach(r => {
        if (!this.props.socket) return;
        this.props.socket.emit('join', { reservationId: r });
        promises.push(
          new Promise(resolve => {
            this.props.socket.emit(
              'getMessages',
              { reservationId: r },
              (messages, checkPoints) => {
                resolve(
                  checkPoints[this.props.userData.name] &&
                    messages &&
                    checkPoints[this.props.userData.name] <
                      messages.pop().createdAt
                );
              }
            );
          })
        );
      });
      const bools = await Promise.all(promises);
      if (bools.includes(true) === this.state.newMessage) return;
      this.setState({ newMessage: bools.includes(true) });
      this.props.socket.on('newMessage', () => {
        this.setState({ newMessage: true });
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.userData.uid &&
      this.props.userData._reservations &&
      this.props.userData._reservations.length
    ) {
      const promises = [];
      this.props.userData._reservations.forEach(r => {
        if (!this.props.socket) return;
        this.props.socket.emit('join', { reservationId: r });
        promises.push(
          new Promise(resolve => {
            this.props.socket.emit(
              'getMessages',
              { reservationId: r },
              (messages, checkPoints) => {
                resolve(
                  checkPoints[this.props.userData.name] &&
                    messages.length &&
                    checkPoints[this.props.userData.name] <
                      messages.pop().createdAt
                );
              }
            );
          })
        );
      });
      const bools = await Promise.all(promises);
      if (bools.includes(true) === this.state.newMessage) return;
      this.setState({ newMessage: bools.includes(true) });
      this.props.socket.on('newMessage', () => {
        this.setState({ newMessage: true });
      });
    }
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    if (!this.props.finishRedux) {
      return (
        <div className="navbar_loading">
          <div className="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    }
    // 로그인 했는지 && 디자이너가 아닌지 확인 후 고객용 navbar
    else if (this.props.userData.uid && !this.props.userData.isD) {
      let helloMessage =
        this.props.userData.isApproval === false
          ? '예디 승인 대기중입니다'
          : `반갑습니다 ${this.props.userData.name}님`;
      let adminTap = this.props.userData.isAdmin ? (
        <NavItem>
          <NavLink tag={Link} to={'/admin/userList'} className="">
            관리자 탭
          </NavLink>
        </NavItem>
      ) : null;
      return (
        <Fragment>
          {adminTap}
          <NavItem>
            <NavLink tag={Link} to={'/about'} className="">
              드리머리 소개
            </NavLink>
          </NavItem>
          <NavItem>
            {/* <NavLink // 장막
              onClick={() => alert('아직 이용하실 수 없습니다.')}
              style={{ cursor: 'pointer' }}
              className=""
            > */}
            <NavLink tag={Link} to={'/designerList'} className="">
              예디찾기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/whyDreamary'} className="">
              예디등록
            </NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret className="">
              {helloMessage}
            </DropdownToggle>
            <DropdownMenu right className="dropdownMenu">
              <DropdownItem>
                <NavLink tag={Link} to={'/reservations'}>
                  마이페이지
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink onClick={this.logout} style={{ cursor: 'pointer' }}>
                  로그아웃
                </NavLink>
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
            {/* <NavLink
              onClick={() => alert('아직 이용하실 수 없습니다.')}
              style={{ cursor: 'pointer' }}
              className=" message_img"
            > */}
            {/* <img alt="alt" src={message_x} style={{ width: '100%' }} /> */}
            <NavLink tag={Link} to={'/message'} className=" message_img">
              <img alt="alt" src={message_x} style={{ width: '100%' }} />
              {this.state.newMessage ? (
                <div
                  style={{
                    position: 'relative',
                    width: '7px',
                    top: '-20px',
                    left: '20px',
                    height: '7px',
                    borderRadius: '100%',
                    backgroundColor: '#dd6866'
                  }}
                />
              ) : null}
            </NavLink>
          </NavItem>
        </Fragment>
      );
      // 로그인 했는지 && 디자이너인지 확인 후 디자이너용 navbar
    } else if (this.props.userData.uid && this.props.userData.isD) {
      let adminTap = this.props.userData.isAdmin ? (
        <NavItem>
          <NavLink tag={Link} to={'/admin/userList'} className="">
            관리자 탭
          </NavLink>
        </NavItem>
      ) : null;
      return (
        <Fragment>
          {adminTap}
          <NavItem>
            <NavLink tag={Link} to={'/whyDreamary'} className="">
              왜?
            </NavLink>
          </NavItem>
          <NavItem>
            {/* <NavLink
              onClick={() => alert('아직 이용하실 수 없습니다.')}
              style={{ cursor: 'pointer' }}
              className=""
            > */}
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
          {/* <NavItem>
            <NavLink tag={Link} to={'/designer/coupon'} className="">
              쿠폰함
            </NavLink>
          </NavItem> */}
          <NavItem>
            {/* <NavLink
              onClick={() => alert('아직 이용하실 수 없습니다.')}
              className=" message_img"
              style={{ cursor: 'pointer' }}
            > */}
            <NavLink tag={Link} to={'/message'} className=" message_img">
              <img alt="alt" src={message_x} style={{ width: '100%' }} />
              {this.state.newMessage ? (
                <div
                  style={{
                    position: 'relative',
                    width: '7px',
                    top: '-20px',
                    left: '20px',
                    height: '7px',
                    borderRadius: '100%',
                    backgroundColor: '#dd6866'
                  }}
                />
              ) : null}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.logout} style={{ cursor: 'pointer' }}>
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
            <NavLink
              onClick={this.props.showSignUp}
              style={{ cursor: 'pointer' }}
            >
              회원가입
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={this.props.showLogin}
              style={{ cursor: 'pointer' }}
            >
              로그인
            </NavLink>
          </NavItem>
          <NavItem>
            {/* <NavLink
              onClick={() => alert('아직 이용하실 수 없습니다.')}
              style={{ cursor: 'pointer' }}
            > */}
            <NavLink tag={Link} to={'/designerList'} className="">
              예디찾기
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/whyDreamary'} className="">
              예디등록
            </NavLink>
          </NavItem>
        </Fragment>
      );
    }
  }
}

const mapStateToProps = ({ authentication: { userData, socket } }) => {
  return { userData, socket };
};

export default connect(mapStateToProps)(Navitems);
