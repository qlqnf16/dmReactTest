import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';

class UserInfo extends Component {
    
    render(){
        return(
           <div>
                <h1>This is UserInfo</h1>
                <UserNav />
            </div> 
        )
    }
}

export default UserInfo