// Mobile Navigation Bar
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DrawerToggleButton from './DrawerToggleButton';
import logo from '../../../assets/images/logo.png';
import tricolor from '../../../assets/images/tricolor.gif';
import './NavigationBar.css';

const NavigationBar = props => (
  <Fragment>
    <div className="mobile-navigation">
      <DrawerToggleButton click={props.drawerClickHandler} />
      <Link to="/">
        <img className="mobile-logo" src={logo} />
      </Link>
      <img className="mobile-tricolor" src={tricolor} />
    </div>
    <div style={{ height: 55 }} />
    <div
      style={{
        textAlign: 'center',
        position: 'absolute',
        zIndex: '99',
        width: '50%',
        padding: '1%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        color: 'white',
        borderRadius: '5px',
        borderColor: 'white',
        left: '25%',
        top: '7%'
      }}
    >
      디자이너 등록 기간입니다.
    </div>
  </Fragment>
);

export default NavigationBar;
