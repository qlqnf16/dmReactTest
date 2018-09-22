import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => (
    <div className="col-2 p-3">
            <h4> 마이 페이지 </h4>
            <Link to='/reservations'><li>예약관리</li></Link>
            <Link to='/myTicket'><li>이용권관리</li></Link>
            <Link to='/userInfo'><li>회원정보관리</li></Link>
            <Link to='/coupon'><li>추천인/쿠폰</li></Link>
    </div>
)

export default UserNav