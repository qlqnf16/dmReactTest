import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { Landing, About, AddDesigner, DesignerList, DesignerDetail, ReservationConfirm, Coupon, MyTicket, Reservations, UserInfo, DesignerCoupon, DesignerInfo, DesignerReservations, DesignerTicket, Schedule, WhyDreamary, InfoDetail } from './pages'
import Toolbar from './components/Navigation/Toolbar/Toolbar'

class App extends Component {
  render() {
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
      </Fragment>
    );
  }
}

export default App;
