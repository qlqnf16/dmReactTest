import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      madeRequest: false,
      isD: false,
      firstRender: false
    };
  }

  componentDidMount = async () => {
    if (!this.state.madeRequest) {
      await this.authListener();
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
            this.setState({
              user,
              madeRequest: true,
              isD: res.val().isD,
              firstRender: true
            });
          });
      } else {
        this.setState({
          user: null,
          madeRequest: true,
          isD: false,
          firstRender: true
        });
      }
    });
  }

  render() {
    console.log('app rendering');
    console.log(new Date('2018-10-23T00:00:00').getTime());
    if (!this.state.firstRender) {
      return (
        <div className="h1">
          <p>Wait...</p>
          <Moment className="h5">{new Date()}</Moment>
          <Moment className="h5" from="2018-10-23">
            {new Date()}
          </Moment>
        </div>
      );
    } else {
      return (
        <Fragment>
          <Toolbar />
          <Route path="/" exact component={Landing} />
          <Route path="/about" component={About} />
          <Route path="/addDesigner" component={AddDesigner} />
          <Route path="/designerList" component={DesignerList} />
          <Route path="/designerDetail/:id" component={DesignerDetail} />
          <Route
            path="/reservationConfirm/:reservation_id"
            component={ReservationConfirm}
          />

          {/* 비로그인 상태에서 url로 접근시 WrongAccess 렌더링 */}
          <Route
            path="/coupon"
            component={this.state.user ? Coupon : WrongAccess}
          />
          <Route
            path="/myTicket"
            component={this.state.user ? MyTicket : WrongAccess}
          />
          <Route
            path="/reservations"
            component={this.state.user ? Reservations : WrongAccess}
          />
          <Route
            path="/userInfo"
            component={this.state.user ? UserInfo : WrongAccess}
          />
          <Route
            path="/infoDetail"
            component={this.state.user ? InfoDetail : WrongAccess}
          />

          {/* 디자이너 아닌 user가 url로 접근시 WrongAccess 렌더링  */}
          <Route
            path="/designer/coupon"
            component={this.state.isD ? DesignerCoupon : WrongAccess}
          />
          <Route
            path="/designer/info"
            component={this.state.isD ? DesignerInfo : WrongAccess}
          />
          <Route
            path="/designer/reservations"
            component={this.state.isD ? DesignerReservations : WrongAccess}
          />
          <Route
            path="/designer/ticket"
            component={this.state.isD ? DesignerTicket : WrongAccess}
          />
          <Route
            path="/designer/schedule"
            component={this.state.isD ? Schedule : WrongAccess}
          />
          <Route
            path="/designer/whyDreamary"
            component={this.state.isD ? WhyDreamary : WrongAccess}
          />
          <Footer />
        </Fragment>
      );
    }
  }
}

export default App;
