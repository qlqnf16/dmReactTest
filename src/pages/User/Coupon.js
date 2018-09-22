import React, { Component } from 'react'
import UserNav from '../../components/Navigation/UserNav/UserNav';

class Coupon extends Component{

    render(){
        return(
            <div className="container">
                <div className="row mt-5">
                    <UserNav />
                    <div className="col-10">This is Coupon</div>
                </div>
            </div>
        )
    }
}

export default Coupon