import React, { Component } from 'react';
import AskNav from '../../components/Navigation/AskNav/AskNav';
import { FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
class QnA extends Component {
  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  qnaSubmit = () => {
    console.log(this.state);
    const inquirie = {
      ...this.state,
      _user: this.props.userData._id
    };
    axios.post('http://52.79.227.227:3030/inquiries', inquirie);
    alert('성공적으로 제출되었습니다.');
  };

  render() {
    return (
      <div>
        <AskNav />
        <h1>관리자 문의</h1>
        <div className="container">
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
              <input
                type="content"
                name="content"
                id="content"
                onChange={this.inputChangeHandler}
                className="if_input"
              />
            </div>
          </FormGroup>
          <button onClick={this.qnaSubmit}>제출</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(QnA);
