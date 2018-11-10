import React, { Component, Fragment } from 'react';
import './AskNavigationBar.css';
import DrawerToggleButton from '../NavigationBar/DrawerToggleButton';
import AskNavigationItems from './AskNavigationItems/AskNavigationItems';

class AskNavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { navDrawer: false };

    this.navBarToggler = this.navBarToggler.bind(this);
  }

  navBarToggler() {
    this.setState(prevState => {
      return { navDrawer: !prevState.navDrawer };
    });
  }

  render() {
    const pathname = this.props.pathname;
    let title = '';
    switch (pathname) {
      case '/FAQ':
        title = 'FAQ';
        break;
      case '/infoPolicy':
        title = '개인정보취급방침';
        break;
      case '/termsofuse':
        title = '이용약관';
        break;
      case '/QnA':
        title = '관리자문의';
        break;
      default:
        break;
    }

    return (
      <Fragment>
        <div className="m_asknav_back">
          <div className="m_asknav_title">{title}</div>
          <DrawerToggleButton click={this.navBarToggler} />
        </div>
        <AskNavigationItems show={this.state.navDrawer} />
      </Fragment>
    );
  }
}

export default AskNavigationBar;
