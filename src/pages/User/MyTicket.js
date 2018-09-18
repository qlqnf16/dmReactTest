import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';
import TicketBox from '../../components/UI/Ticket/TicketBox/TicketBox';
import TicketCounter from '../../components/UI/Ticket/TicketCounter/TicketCounter';
import TicketPurchaseButton from "../../components/UI/Ticket/TicketPurchaseButton/TicketPurchaseButton";

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
                <div>
                    <TicketCounter count={this.state.tickets.reduce((accu, pres) => !pres.expiredAt ? accu + 1 : accu , 0)} />
                    <TicketPurchaseButton />
                    <TicketBox tickets={this.state.tickets} />
                </div>
            </div>
        )
    }
}

export default MyTicket;