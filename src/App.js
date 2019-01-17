import React, { Component, Fragment } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Spinner from './assets/images/loading_spinner.gif';
import {
  Landing,
  WrongAccess,
  About,
  AddDesigner,
  DesignerList,
  DesignerDetail,
  Reservation,
  ReservationConfirm,
  Message,
  Cash,
  Chat,
  Coupon,
  LikeDesigner,
  Reservations,
  UserInfo,
  DesignerCoupon,
  DesignerInfo,
  DesignerReservations,
  DesignerTicket,
  Schedule,
  WhyDreamary,
  AdminUserList,
  AdminDesignerList,
  AdminWaitingList,
  AdminReservationList,
  AdminMakeCoupon,
  AdminNoShow,
  AdminQnA,
  AdminCardList,
  AdminYeinbub,
  AdminWithdrawal,
  TermsOfUse,
  InfoPolicy,
  FAQ,
  QnA,
  Withdrawal,
  SignUp
} from './pages';
// mobile page
import {
  M_Landing,
  M_About,
  M_AddDesigner,
  M_Chat,
  M_DesignerDetail,
  M_Message,
  M_Reservation,
  M_ReservationConfirm,
  M_WrongAccess,
  M_CustomerMyPage,
  M_DesignerList,
  M_Coupon,
  M_LikeDesigner,
  M_MyTicket,
  M_Reservations,
  M_UserInfo,
  M_DesignerCoupon,
  M_DesignerInfo,
  M_DesignerReservations,
  M_DesignerTicket,
  M_Schedule,
  M_WhyDreamary,
  M_AdminUserList,
  M_AdminDesignerList,
  M_AdminWaitingList,
  M_AdminReservationList,
  M_AdminMakeCoupon,
  M_AdminNoShow,
  M_AdminQnA,
  M_FAQ,
  M_InfoPolicy,
  M_QnA,
  M_TermsOfUse,
  M_Withdrawal,
  M_SignUp
} from './mobilePages';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Footer/Footer';
import MobileFooter from './mobilePages/components/Footer/Footer';
import MobileNavigationBar from './mobilePages/components/NavigationBar/NavigationBar';
import MobileSideDrawer from './mobilePages/components/NavigationBar/SideDrawer';
import MobileBackdrop from './mobilePages/components/NavigationBar/Backdrop';
import firebase from './config/Firebase';
import NoticeModal from './utility/NoticeModal';

import { connect } from 'react-redux';
import * as actions from './modules';
import axios from './config/Axios';
import './App.css';
// import SideDrawer from './mobilePages/components/NavigationBar/SideDrawer';
class App extends Component {
  state = {
    madeRequest: false,
    width: window.innerWidth, // mobile version 만들기 위함
    sideDrawerOpen: false, // mobile version sideDrawer
    finishRedux: true,
    useFilter: false
  };

  ///////Filter 유지 시도 /////

  filterChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
    this.useFilter();
  };

  refreshFilter = () => {
    this.setState({
      gender: false,
      date: false,
      // sido: false,
      sigungu: false,
      cut: false,
      perm: false,
      dye: false
    });
  };

  useFilter = () => {
    this.setState({ useFilter: true });
  };

  /////////// mobile version sideDrawer methods

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  ////////////////////////////

  componentDidMount = () => {
    if (!this.state.madeRequest) this.authListener();

    let ua = navigator.userAgent || navigator.vendor || window.opera;
    const isIE = ua.indexOf('MSIE') > -1 || ua.indexOf('rv') > -1;
    if (isIE)
      alert(
        'Internet Explorer에서는 드리머리의 일부 기능이 작동하지 않을 수 있습니다. \n크롬과 같은 다른 브라우저 또는 모바일 환경을 이용해주세요'
      );
  };

  authListener() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user && firebase.auth().currentUser) {
        this.setState({ finishRedux: false });
        await firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
          .on('value', async res => {
            this.setState({
              madeRequest: true,
              isLogin: true
            });
            // redux;
            let userData = res.val();
            const { data } = await axios.get(`users/` + userData._id);
            await this.props.login(userData);
            await this.props.updateRedux('expiredAt', data.expiredAt);
            await this.props.updateRedux('point', data.point);
            await this.props.updateRedux('_tickets', data._tickets);
            await this.props.updateRedux('_reservations', data._reservations);
            await this.props.connectSocket();
            if (
              !userData.isRegister &&
              !this.props.location.pathname.includes('whyDreamary')
            ) {
              this.props.history.push('/signup');
            } else if (this.props.location.pathname.includes('whyDreamary')) {
              this.props.history.push('/addDesigner');
            }
            if (!userData.withdrawal) this.setState({ finishRedux: true });
          });

        if (document.querySelector('iframe')) {
          document
            .querySelector('iframe')
            .setAttribute('src', "don't try to look at this!");
        }
      } else {
        // logout 하면 landing page로 이동
        this.props.history.push('/');
        this.state.isLogin && window.location.reload();
        this.setState({ madeRequest: true, finishRedux: true });

        // redux
        this.props.login({});
      }
    });
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 500;

    let ua = navigator.userAgent || navigator.vendor || window.opera;
    const isFacebookApp = ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
    const isInstagram = ua.indexOf('Instagram') > -1 ? true : false;
    // 장막
    // const isMobile = false;
    // firebase에서 불러오기 전
    if (!this.state.madeRequest) {
      return (
        <div
          style={{ height: '100vh', width: '100%' }}
          className="d-flex justify-content-center align-items-center"
        >
          <img alt="alt" style={{ height: '20%' }} src={Spinner} />
        </div>
      );

      // firebase database에서 호출 후,
    } else if (!isFacebookApp && !isMobile && !isInstagram) {
      return (
        <Fragment>
          {/* <NoticeModal /> */}
          <Toolbar finishRedux={this.state.finishRedux} />
          <div className="app-content web">
            <Switch>
              {/* 필터 유지 위해 다른 방법으로 렌더링 */}
              <Route
                path="/"
                exact
                render={() => (
                  <DesignerList
                    filterChangeHandler={this.filterChangeHandler}
                    refreshFilter={this.refreshFilter}
                    state={this.state}
                    useFilter={this.useFilter}
                  />
                )}
              />
              {/* <Route path="/" exact component={DesignerList} /> */}
              <Route path="/landing" component={Landing} />
              <Route path="/about" component={About} />
              <Route path="/QnA" component={QnA} />
              <Route path="/TermsOfUse" component={TermsOfUse} />
              <Route path="/FAQ" component={FAQ} />
              <Route path="/InfoPolicy" component={InfoPolicy} />
              <Route path="/Withdrawal" component={Withdrawal} />

              {/* 필터 유지 위해 다른 방법으로 렌더링 */}
              <Route
                path="/designerList"
                render={() => (
                  <DesignerList
                    filterChangeHandler={this.filterChangeHandler}
                    refreshFilter={this.refreshFilter}
                    state={this.state}
                    useFilter={this.useFilter}
                  />
                )}
              />
              {/* <Route path="/designerList" component={DesignerList} /> */}
              <Route path="/designerDetail/:id" component={DesignerDetail} />
              <Route
                path="/reservationConfirm/:reservation_id"
                component={ReservationConfirm}
              />
              <Route path="/whyDreamary" component={WhyDreamary} />
              <Route path="/signUp" component={SignUp} />

              {/* 비로그인 상태에서 url로 접근시 WrongAccess 렌더링 */}
              <Route
                path="/message"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? Message
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/chat"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? Chat
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/reservation"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? Reservation
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/addDesigner"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? AddDesigner
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/coupon"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? Coupon
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/likedesigner"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? LikeDesigner
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/reservations"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? Reservations
                      : SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/designer/whyDreamary"
                component={this.props.userData.isD ? WhyDreamary : WrongAccess}
              />
              <Route
                path="/userInfo"
                component={this.props.userData.uid ? UserInfo : WrongAccess}
              />
              {/* 디자이너 아닌 user가 url로 접근시 WrongAccess 렌더링  */}
              <Route
                path="/designer/coupon"
                component={
                  this.props.userData.isD ? DesignerCoupon : WrongAccess
                }
              />
              <Route
                path="/designer/info"
                component={this.props.userData.isD ? DesignerInfo : WrongAccess}
              />
              <Route
                path="/designer/reservations"
                component={
                  this.props.userData.isD ? DesignerReservations : WrongAccess
                }
              />
              <Route
                path="/designer/ticket"
                component={
                  this.props.userData.isD ? DesignerTicket : WrongAccess
                }
              />
              <Route
                path="/designer/schedule"
                component={this.props.userData.isD ? Schedule : WrongAccess}
              />

              <Route
                path="/designer/cash"
                component={this.props.userData.isD ? Cash : WrongAccess}
              />

              <Route
                path="/admin/userList"
                component={
                  this.props.userData.isAdmin ? AdminUserList : WrongAccess
                }
              />
              <Route
                path="/admin/designerList"
                component={
                  this.props.userData.isAdmin ? AdminDesignerList : WrongAccess
                }
              />
              <Route
                path="/admin/waitingList"
                component={
                  this.props.userData.isAdmin ? AdminWaitingList : WrongAccess
                }
              />
              <Route
                path="/admin/reservationList"
                component={
                  this.props.userData.isAdmin
                    ? AdminReservationList
                    : WrongAccess
                }
              />
              <Route
                path="/admin/makecoupon"
                component={
                  this.props.userData.isAdmin ? AdminMakeCoupon : WrongAccess
                }
              />
              <Route
                path="/admin/noshow"
                component={
                  this.props.userData.isAdmin ? AdminNoShow : WrongAccess
                }
              />
              <Route
                path="/admin/qna"
                component={this.props.userData.isAdmin ? AdminQnA : WrongAccess}
              />
              <Route
                path="/admin/cardList"
                component={
                  this.props.userData.isAdmin ? AdminCardList : WrongAccess
                }
              />
              <Route
                path="/admin/yeinbub"
                component={
                  this.props.userData.isAdmin ? AdminYeinbub : WrongAccess
                }
              />
              <Route
                path="/admin/withdrawal"
                component={
                  this.props.userData.isAdmin ? AdminWithdrawal : WrongAccess
                }
              />
              <Route component={WrongAccess} />
            </Switch>
          </div>
          <div style={{ height: 200 }} />
          <Footer />
        </Fragment>
      );
    } else {
      // -----------------------------------
      // 시작 화면이 500px 보다 작을 경우에 모바일 페이지를 렌더링할 것임.
      // -----------------------------------
      let backdrop;

      if (this.state.sideDrawerOpen) {
        backdrop = <MobileBackdrop click={this.backdropClickHandler} />;
      }
      return (
        <Fragment>
          <div className="app-content">
            {/* <NoticeModal /> */}
            <MobileNavigationBar
              drawerClickHandler={this.drawerToggleClickHandler}
            />
            <MobileSideDrawer
              click={this.backdropClickHandler}
              show={this.state.sideDrawerOpen}
              finishRedux={this.state.finishRedux}
            />
            {backdrop}
            {/* ------------------------------- */}
            {/* mobile router */}
            {/* ------------------------------- */}
            {/* landing */}
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <M_DesignerList
                    filterChangeHandler={this.filterChangeHandler}
                    refreshFilter={() => this.refreshFilter()}
                    state={this.state}
                    useFilter={() => this.useFilter()}
                  />
                )}
              />
              {/* <Route path="/" exact component={M_DesignerList} /> */}
              <Route path="/landing" component={M_Landing} />
              <Route path="/about" component={M_About} />
              <Route path="/FAQ" component={M_FAQ} />
              <Route path="/termsofuse" component={M_TermsOfUse} />
              <Route path="/infoPolicy" component={M_InfoPolicy} />
              <Route path="/QnA" component={M_QnA} />
              <Route path="/Withdrawal" component={M_Withdrawal} />
              <Route path="/signup" component={M_SignUp} />
              <Route
                path="/designerlist"
                render={() => (
                  <M_DesignerList
                    filterChangeHandler={this.filterChangeHandler}
                    refreshFilter={() => this.refreshFilter()}
                    state={this.state}
                    useFilter={() => this.useFilter()}
                  />
                )}
              />
              {/* <Route path="/designerlist" component={M_DesignerList} /> */}
              <Route path="/designerDetail/:id" component={M_DesignerDetail} />
              <Route
                path="/reservationConfirm/:reservation_id"
                component={M_ReservationConfirm}
              />
              <Route path="/whyDreamary" component={M_WhyDreamary} />
              <Route
                path="/addDesigner"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_AddDesigner
                      : M_SignUp
                    : M_WrongAccess
                }
              />
              {/* 로그인 했을 때만 */}
              <Route
                path="/message"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_Message
                      : M_SignUp
                    : WrongAccess
                }
              />
              <Route
                path="/chat"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_Chat
                      : M_SignUp
                    : M_WrongAccess
                }
              />
              <Route
                path="/reservation"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_Reservation
                      : M_SignUp
                    : M_WrongAccess
                }
              />

              <Route
                path="/coupon"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_Coupon
                      : M_SignUp
                    : M_WrongAccess
                }
              />
              <Route
                path="/likedesigner"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_LikeDesigner
                      : M_SignUp
                    : M_WrongAccess
                }
              />
              <Route
                path="/myTicket"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_MyTicket
                      : M_SignUp
                    : M_WrongAccess
                }
              />
              <Route
                path="/reservations"
                component={
                  this.props.userData.uid
                    ? this.props.userData.isRegister
                      ? M_Reservations
                      : M_SignUp
                    : M_WrongAccess
                }
              />
              <Route
                path="/userInfo"
                component={this.props.userData.uid ? M_UserInfo : M_WrongAccess}
              />

              {/* 디자이너에게만 */}
              <Route
                path="/designer/coupon"
                component={
                  this.props.userData.isD ? M_DesignerCoupon : M_WrongAccess
                }
              />
              <Route
                path="/designer/info"
                component={
                  this.props.userData.isD ? M_DesignerInfo : M_WrongAccess
                }
              />
              <Route
                path="/designer/reservations"
                component={
                  this.props.userData.isD
                    ? M_DesignerReservations
                    : M_WrongAccess
                }
              />
              <Route
                path="/designer/ticket"
                component={
                  this.props.userData.isD ? M_DesignerTicket : M_WrongAccess
                }
              />
              <Route
                path="/designer/schedule"
                component={this.props.userData.isD ? M_Schedule : M_WrongAccess}
              />

              {/* 관리자페이지 */}
              <Route
                path="/admin/userlist"
                component={
                  this.props.userData.isAdmin ? M_AdminUserList : M_WrongAccess
                }
              />
              <Route
                path="/admin/designerlist"
                component={
                  this.props.userData.isAdmin
                    ? M_AdminDesignerList
                    : M_WrongAccess
                }
              />
              <Route
                path="/admin/makecoupon"
                component={
                  this.props.userData.isAdmin
                    ? M_AdminMakeCoupon
                    : M_WrongAccess
                }
              />
              <Route
                path="/admin/noshow"
                component={
                  this.props.userData.isAdmin ? M_AdminNoShow : M_WrongAccess
                }
              />
              <Route
                path="/admin/qna"
                component={
                  this.props.userData.isAdmin ? M_AdminQnA : M_WrongAccess
                }
              />
              <Route
                path="/admin/reservationlist"
                component={
                  this.props.userData.isAdmin
                    ? M_AdminReservationList
                    : M_WrongAccess
                }
              />
              <Route
                path="/admin/waitinglist"
                component={
                  this.props.userData.isAdmin
                    ? M_AdminWaitingList
                    : M_WrongAccess
                }
              />

              {/* customer my page (for testing MyPageNavigationBar) */}
              <Route path="/mypage" component={M_CustomerMyPage} />
              <Route component={M_WrongAccess} />
            </Switch>
          </div>
          <MobileFooter />
        </Fragment>
      );
    }
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(App)
);
