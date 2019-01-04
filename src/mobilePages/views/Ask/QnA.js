import React, { Component } from 'react';
import AskNavigationBar from '../../components/AskNavigationBar/AskNavigationBar';
import axios from '../../../config/Axios';
import { connect } from 'react-redux';

class QnA extends Component {
  state = {
    fetched: true
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  qnaSubmit = async () => {
    this.setState({ fetched: false });
    const inquirie = {
      ...this.state,
      _user: this.props.userData._id
    };
    await axios.post('inquiries', inquirie);
    this.setState({ fetched: true });
    alert('성공적으로 제출되었습니다.');
  };

  render() {
    return (
      <div>
        <AskNavigationBar pathname={this.props.location.pathname} />
        <div className="container-fluid m_ask" style={{ width: '93.8%' }}>
          <div className="m_ask_title">관리자문의</div>
          <div className="m_ask_form">
            <div className="m_ask_formTitle">성명</div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="성명"
              onChange={this.inputChangeHandler}
              className="m_ask_input"
            />
          </div>
          <div className="m_ask_form">
            <div className="m_ask_formTitle">이메일 주소</div>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="이메일 주소"
              onChange={this.inputChangeHandler}
              className="m_ask_input"
            />
          </div>
          <div className="m_ask_form">
            <div className="m_ask_formTitle">제목</div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="제목"
              onChange={this.inputChangeHandler}
              className="m_ask_input"
            />
          </div>
          <div className="m_ask_form">
            <div className="m_ask_formTitle">내용</div>
            <textarea
              name="content"
              id="content"
              placeholder="문의사항을 입력해주세요"
              onChange={this.inputChangeHandler}
              className="m_ask_input"
              style={{ height: '166px' }}
            />
          </div>
          {this.state.fetched ? (
            <div onClick={this.qnaSubmit} className="m_ask_button">
              제출하기
            </div>
          ) : (
            <div className="m_ask_button">제출중</div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(QnA);
