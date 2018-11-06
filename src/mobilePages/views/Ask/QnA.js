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
        <div className='container-fluid m_ask' style={{width: '93.8%'}}>
          <div className='m_ask_title'>관리자문의</div>
          <div className='m_ask_form'>
            <div className='m_ask_formTitle'>성명</div>
            <input type='text' name='name' id='name' placeholder='성명' className='m_ask_input' />
          </div>
          <div className='m_ask_form'>
            <div className='m_ask_formTitle'>이메일 주소</div>
            <input type='text' name='email' id='email' placeholder='이메일 주소' className='m_ask_input' />
          </div>
          <div className='m_ask_form'>
            <div className='m_ask_formTitle'>제목</div>
            <input type='text' name='title' id='title' placeholder='제목' className='m_ask_input' />
          </div>
          <div className='m_ask_form'>
            <div className='m_ask_formTitle'>내용</div>
            <textarea name='content' id='content' placeholder='문의사항을 입력해주세요' className='m_ask_input' style={{height: '166px'}} />
          </div>
          <div className='m_ask_button'>제출하기</div>
        </div>
      </div>
    )
  }
}

export default QnA