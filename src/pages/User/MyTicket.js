import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';
import TicketBox from '../../components/UI/TicketBox/TicketBox';

class MyTicket extends Component{
    state = {
        tickets: [
            {
                price: 3000,
                purchasedAt: 201809015,
                expiredAt: null
            },{
                price: 5000,
                purchasedAt: 20180810,
                expiredAt:20180811
            }
        ]
    }

    render(){
        return (
            <div>
                <h1>This is MyTicket</h1>
                <UserNav />
                <TicketBox tickets={this.state.tickets} />
            </div>
        )
    }
}
export default MyTicket