import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Landing, WrongAccess, About, AddDesigner, DesignerList, DesignerDetail, ReservationConfirm, Coupon, MyTicket, Reservations, UserInfo, DesignerCoupon, DesignerInfo, DesignerReservations, DesignerTicket, Schedule, WhyDreamary, InfoDetail } from './pages'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import Footer from './components/UI/Footer/Footer'
import firebase from './config/Firebase'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        user : null,
    }
  } 
  
  componentWillMount(){
    this.authListener()
    console.log("WillMOUNTED")
  }

  authListener() {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({ user });
              console.log(this.state.user)
          } else {
              this.setState({ user : null });
          }
      })
  }

  render() {
    console.log("app rendering")
    
    return (
      <Fragment>
        <Toolbar />
        <Route path='/' exact component={Landing} />
        <Route path='/about' component={About} />
        <Route path='/addDesigner' component={AddDesigner} />
        <Route path='/designerList' component={DesignerList} />
        <Route path='/designerDetail/:id' component={DesignerDetail} />
        <Route path='/reservationConfirm/:reservation_id' component={ReservationConfirm} />

        {/* 비로그인 상태에서 url로 접근시 WrongAccess 렌더링 */}
        <Route path='/coupon' component={this.state.user? Coupon : WrongAccess} /> 
        <Route path='/myTicket' component={this.state.user? MyTicket : WrongAccess} />
        <Route path='/reservations' component={this.state.user? Reservations : WrongAccess} />
        <Route path='/userInfo' component={this.state.user? UserInfo : WrongAccess} />
        <Route path='/infoDetail' component={this.state.user? InfoDetail : WrongAccess} />

        <Route path='/designer/coupon' component={this.state.isD? DesignerCoupon : WrongAccess} />
        <Route path='/designer/info' component={DesignerInfo} />
        <Route path='/designer/reservations' component={DesignerReservations} />
        <Route path='/designer/ticket' component={DesignerTicket} />
        <Route path='/designer/schedule' component={Schedule} />
        <Route path='/designer/whyDreamary' component={WhyDreamary} />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
