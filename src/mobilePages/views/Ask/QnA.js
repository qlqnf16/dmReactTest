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
        <div className='container-fluid' style={{width: '93.8%'}}>
          <div className='m_ask_title'>관리자문의</div>
        </div>
      </div>
    )
  }
}

export default QnA