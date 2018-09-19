import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Landing, About, AddDesigner, DesignerList, DesignerDetail, ReservationConfirm, Coupon, MyTicket, Reservations, UserInfo, DesignerCoupon, DesignerInfo, DesignerReservations, DesignerTicket, Schedule, WhyDreamary, InfoDetail } from './pages'
import Toolbar from './components/Navigation/Toolbar/Toolbar'
import Footer from './components/UI/Footer/Footer'
import firebase from './config/Firebase'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        user : null,
        rendering : false
    }
  } 
  

  componentWillMount(){
    this.authListener()
    this.setState({
      ...this.state,
      rendering : true
    })
    console.log("WillMOUNTED")
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return this.state.rendering !== nextState.rendering
  // }
  

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

        <Route path='/coupon' component={Coupon} />
        <Route path='/myTicket' component={MyTicket} />
        <Route path='/reservations' component={Reservations} />
        <Route path='/userInfo' component={UserInfo} />
        <Route path='/infoDetail' component={InfoDetail} />

        <Route path='/designer/coupon' component={DesignerCoupon} />
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
