import React, { Component } from 'react';
import AskNav from '../../components/Navigation/AskNav/AskNav';
import { FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import axios from '../../config/Axios';
class QnA extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  qnaSubmit = () => {
    const inquirie = {
      ...this.state,
      _user: this.props.userData._id
    };
    axios.post('inquiries', inquirie);
    alert('성공적으로 제출되었습니다.');
  };

  render() {
    return (
      <div className="container-fluid ask">
        <AskNav />
        <div className="ask_title">관리자 문의</div>
        <div style={{ width: '50%', margin: 'auto' }}>
          <FormGroup row>
            <div className="col-3 if_head">성명</div>
            <div className="col-9">
              <input
                type="name"
                name="name"
                id="name"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-3 if_head">이메일 주소</div>
            <div className="col-9">
              <input
                type="email"
                name="email"
                id="email"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-3 if_head">제목</div>
            <div className="col-9">
              <input
                type="title"
                name="title"
                id="title"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-3 if_head">내용</div>
            <div className="col-9">
              <textarea
                name="content"
                id="content"
                onChange={this.inputChangeHandler}
                className="if_input"
                style={{ height: '262px' }}
              />
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-3" />
            <div className="col-9">
              <div className="ask_button" onClick={this.qnaSubmit}>
                제출하기
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(QnA);
