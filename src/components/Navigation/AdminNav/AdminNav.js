import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNav = () => (
  <div>
    <NavLink
      className="m-2 lg"
      to="/admin/userlist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      유저리스트
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/designerlist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      디자이너리스트
    </NavLink>
    <NavLink
      className="m-2 lg"
      to="/admin/reservationlist"
      activeStyle={{
        color: '#1f3354',
        borderBottom: 'solid 1.8px #1f3354'
      }}
    >
      예약 리스트
    </NavLink>
  </div>
);

export default AdminNav;
