import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import {
  Landing,
  WrongAccess,
  About,
  AddDesigner,
  DesignerList,
  DesignerDetail,
  ReservationConfirm,
  Coupon,
  MyTicket,
  Reservations,
  UserInfo,
  DesignerCoupon,
  DesignerInfo,
  DesignerReservations,
  DesignerTicket,
  Schedule,
  WhyDreamary,
  InfoDetail
} from './pages';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Footer/Footer';
import firebase from './config/Firebase';

import { connect } from 'react-redux';
import * as actionTypes from './store/actions';

class App extends Component {
  state = {
    madeRequest: false
  };

  componentDidMount = () => {
    if (!this.state.madeRequest) {
      this.authListener();
    }

    let links = [
      'https://code.jquery.com/jquery-1.12.4.min.js',
      'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
    ];

    for (let link of links) {
      const script = document.createElement('script');

      script.src = link;
      script.async = true;

      document.body.appendChild(script);
    }
  };

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
          .on('value', res => {
            this.setState({ madeRequest: true });
            this.props.login(res.val());
          });
      } else {
        this.setState({ madeRequest: true });
        this.props.login({});
      }
    });
  }

  render() {
    console.log('app rendering');
    if (!this.state.madeRequest) {
      return (
        <div className="h1">
          <p>Wait...</p>
          <Moment className="h5">{new Date()}</Moment>
        </div>
      );
    } else {
      return (
        <Fragment>
          <Toolbar />
          <Route path="/" exact component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/designerList" component={DesignerList} />
          <Route path="/designerDetail/:id" component={DesignerDetail} />
          <Route
            path="/reservationConfirm/:reservation_id"
            component={ReservationConfirm}
          />

          {/* 비로그인 상태에서 url로 접근시 WrongAccess 렌더링 */}
          <Route
            path="/addDesigner"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegiser
                  ? AddDesigner
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/coupon"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegiser
                  ? Coupon
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/myTicket"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegiser
                  ? MyTicket
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/reservations"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegiser
                  ? Reservations
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/userInfo"
            component={this.props.userData.uid ? UserInfo : WrongAccess}
          />
          <Route
            path="/infoDetail"
            component={this.props.userData.uid ? InfoDetail : WrongAccess}
          />

          {/* 디자이너 아닌 user가 url로 접근시 WrongAccess 렌더링  */}
          <Route
            path="/designer/coupon"
            component={this.props.userData.isD ? DesignerCoupon : WrongAccess}
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
            component={this.props.userData.isD ? DesignerTicket : WrongAccess}
          />
          <Route
            path="/designer/schedule"
            component={this.props.userData.isD ? Schedule : WrongAccess}
          />
          <Route
            path="/designer/whyDreamary"
            component={this.props.userData.isD ? WhyDreamary : WrongAccess}
          />
          <Footer />
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return { userData: state.userData };
};

const mapDispatchToProps = dispatch => {
  return {
    login: userData => dispatch({ type: actionTypes.LOGIN, userData: userData })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
