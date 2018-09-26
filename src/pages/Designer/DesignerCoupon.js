import React, { Component } from 'react'
import firebase from 'firebase'

class DesignerCoupon extends Component {
    
    render(){
        return (
          <div className='container'>
            <h1 className='mt-5'>추천인/쿠폰</h1>
            <h3>{firebase.auth().currentUser.uid}</h3>
          </div>
        )
    }
}
export default DesignerCoupon