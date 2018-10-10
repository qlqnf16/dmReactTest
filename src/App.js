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
  Reservation,
  ReservationConfirm,
  Message,
  Chat,
  Coupon,
  LikeDesigner,
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
import * as actions from './modules';
import axios from 'axios';
console.log(actions);
class App extends Component {
  state = {
    madeRequest: false
  };

  componentDidMount = () => {
    if (!this.state.madeRequest) {
      this.authListener();

      // iamport 사용하기 위한 inline script 작성
      // let links = [
      //   'https://code.jquery.com/jquery-1.12.4.min.js',
      //   'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
      // ];

      // for (let link of links) {
      //   const script = document.createElement('script');

      //   script.src = link;
      //   script.async = true;

      //   document.body.appendChild(script);
      // }
    }
  };

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(this.props);
      if (user) {
        firebase
          .database()
          .ref('/users/' + firebase.auth().currentUser.uid)
          .on('value', async res => {
            this.setState({ madeRequest: true });

            // redux;
            let userData = res.val();
            const { data } = await axios.get(
              `http://52.79.227.227:3030/users/` + userData._id
            );
            console.log(data);
            userData['_recruit'] = data._recruit;
            userData['_tickets'] = data._tickets;
            userData['_reservations'] = data._reservations;
            console.log(userData);
            this.props.login(userData);
          });
      } else {
        // logout 하면 landing page로 이동
        this.props.history.push('/');
        this.setState({ madeRequest: true });

        // redux
        this.props.login({});
      }
    });
  }

  render() {
    console.log('app rendering');

    // firebase에서 불러오기 전
    if (!this.state.madeRequest) {
      return (
        <div className="h1">
          <p>Wait...</p>
          <Moment className="h5">{new Date()}</Moment>
        </div>
      );

      // firebase database에서 호출 후,
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
            path="/message"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? Message
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/chat"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? Chat
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/reservation/:card_id"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? Reservation
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/addDesigner"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? AddDesigner
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/coupon"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? Coupon
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/likedesigner"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? LikeDesigner
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/myTicket"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
                  ? MyTicket
                  : UserInfo
                : WrongAccess
            }
          />
          <Route
            path="/reservations"
            component={
              this.props.userData.uid
                ? this.props.userData.isRegister
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

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(App)
);
