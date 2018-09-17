import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => (
    <div>
        <Link to='/reservations'><li>예약관리</li></Link>
        <Link to='/myTicket'><li>이용권관리</li></Link>
        <Link to='/userInfo'><li>회원정보관리</li></Link>
        <Link to='/coupon'><li>추천인/쿠폰</li></Link>
    </div>
)

export default UserNav