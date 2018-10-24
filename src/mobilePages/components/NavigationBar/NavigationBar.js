// Mobile Navigation Bar
import React from 'react';
import DrawerToggleButton from './DrawerToggleButton';
import logo from '../../../assets/images/logo.png';
import tricolor from '../../../assets/images/tricolor.gif';
import './NavigationBar.css';

const NavigationBar = props => (
  <div className="mobile-navigation">
    <DrawerToggleButton click={props.drawerClickHandler} />
    <img className="mobile-logo" src={logo} />
    <img className="mobile-tricolor" src={tricolor} />
  </div>
);

export default NavigationBar;
