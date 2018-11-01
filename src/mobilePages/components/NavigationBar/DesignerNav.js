import React, { Fragment } from 'react'
import './DesignerNav.css'
import { NavLink } from 'react-router-dom'

const DesignerNav = () => (
  <Fragment>
    <div className="dnav_top">마이페이지</div>
    <div className='dnav_back'>
    <NavLink 
      to='/designer/reservations' 
      className='dnav_navitem' 
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}>
      예약관리
      </NavLink>
    <NavLink 
      to='/designer/schedule' 
      className='dnav_navitem' 
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}>
      스케줄등록
      </NavLink>
    <NavLink 
      to='/designer/ticket' 
      className='dnav_navitem' 
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}>
      이용권관리
      </NavLink>
    <NavLink 
      to='/designer/info' 
      className='dnav_navitem' 
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}>
      회원정보관리
      </NavLink>
    <NavLink 
      to='/designer/coupon' 
      className='dnav_navitem' 
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}>
      프로모션
      </NavLink>
    </div>
  </Fragment>
);

export default DesignerNav