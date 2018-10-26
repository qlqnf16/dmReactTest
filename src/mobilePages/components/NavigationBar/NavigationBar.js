// Mobile Navigation Bar
import React from 'react';
import { Link } from 'react-router-dom';
import DrawerToggleButton from './DrawerToggleButton';
import logo from '../../../assets/images/logo.png';
import tricolor from '../../../assets/images/tricolor.gif';
import './NavigationBar.css';

const NavigationBar = props => (
  <div className="mobile-navigation">
    <DrawerToggleButton click={props.drawerClickHandler} />
    <Link to="/">
      <img className="mobile-logo" src={logo} />
    </Link>
    <img className="mobile-tricolor" src={tricolor} />
  </div>
);

export default NavigationBar;
