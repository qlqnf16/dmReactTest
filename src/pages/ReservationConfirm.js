import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

class ReservationConfirm extends Component {
  render() {
    return (
        <div>
            <h1>This is ReservationConfirm</h1>
            <Link to='/reservations'><Button color="primary">예약확인 / 취소</Button></Link>
        </div>
    )
  }
}

export default ReservationConfirm