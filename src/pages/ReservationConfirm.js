import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'

const ReservationConfirm = () => (
    <div>
        <h1>This is ReservationConfirm</h1>
        <Link to='/reservations'><Button color="primary">예약확인 / 취소</Button></Link>
    </div>
)

export default ReservationConfirm