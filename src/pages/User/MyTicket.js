import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';

class MyTicket extends Component{
    render(){
        return (
            <div>
                <h1>This is MyTicket</h1>
                <UserNav />
            </div>
        )
    }
}
export default MyTicket