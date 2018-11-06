import React, { Component } from 'react';
import AskNavigationBar from '../../components/AskNavigationBar/AskNavigationBar';

class QnA extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div>
        <AskNavigationBar pathname={this.props.location.pathname} />

        QnA
      </div>
    )
  }
}

export default QnA