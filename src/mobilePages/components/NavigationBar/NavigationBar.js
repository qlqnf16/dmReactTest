// Mobile Navigation Bar
import React, { Component } from 'react';
import DrawerToggleButton from './DrawerToggleButton';
import logo from '../../../assets/images/logo.png';
import tricolor from '../../../assets/images/tricolor.gif';
import './NavigationBar.css';

const NavigationBar = props => (
  // <header className="toolbar">
  //   <nav className="toolbar__navigation">
  //     <div className="toolbar__toggle-button">
  //       <DrawerToggleButton click={props.drawerClickHandler} />
  //     </div>
  //     <div className="toolbar__logo">
  //       <a href="/">THE LOGO</a>
  //     </div>
  //     <div className="spacer" />
  //     <div className="toolbar_navigation-items">
  //       <ul>
  //         <li>
  //           <a href="/">Products</a>
  //         </li>
  //         <li>
  //           <a href="/">Users</a>
  //         </li>
  //       </ul>
  //     </div>
  //   </nav>
  // </header>
  <div className="mobile-navigation">
    <DrawerToggleButton click={props.drawerClickHandler} />
    <img className="mobile-logo" src={logo} />
    <img className="mobile-tricolor" src={tricolor} />
  </div>
);

export default NavigationBar;
