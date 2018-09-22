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
            <div className="container">
                <div className="row">
                    <UserNav />
                    <div className="col-10 my-5">
                        <h1>이용권 관리</h1>
                        <div className="row">
                            <div className="col-4  py-2">

                                <TicketCounter count={this.state.tickets.reduce((accu, pres) => !pres.expiredAt ? accu + 1 : accu , 0)} />
                                <TicketPurchaseButton />
                            </div>
                            <div className="col-8">
                                <TicketBox tickets={this.state.tickets} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyTicket;