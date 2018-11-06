import React, { Component } from 'react';
import AskNavigationBar from '../../components/AskNavigationBar/AskNavigationBar';

class FAQ extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <AskNavigationBar pathname={this.props.location.pathname} />
        FAQ
      </div>
    )
  }
}

export default FAQ