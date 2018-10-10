import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Col
} from 'reactstrap';

class UserInfo extends Component {
  state = {
    name: this.props.userData.name,
    email: this.props.userData.email,
    birthday: this.props.userData.birthday,
    phoneNumber: this.props.userData.phoneNumber
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  submitHandler = async () => {
    const { uid } = firebase.auth().currentUser;
    const firebaseUserData = {
      name: this.state.name,
      birthday: this.state.birthday,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    };
    if (!this.props.userData.isRegister)
      return alert('휴대폰 인증을 진행해주세요');
    await firebase
      .database()
      .ref('users/' + uid)
      .update(firebaseUserData);
  };

  phoneCert() {
    console.log('Asdfafds');
    const { IMP } = window;
    IMP.init('imp38067773');
    IMP.certification(
      {
        merchant_uid: 'merchant_' + new Date().getTime(),
        popup: true
      },
      function(rsp) {
        if (rsp.success) {
          // 인증성공
          console.log(rsp.imp_uid);
          console.log(rsp.merchant_uid);
        } else {
          // 인증취소 또는 인증실패
          var msg = '인증에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;

          alert(msg);
        }
      }
    );
  }

  certification() {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({ isRegister: true });
  }
  noCertification() {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({ isRegister: false });
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <UserNav />
          <Container className="col-10">
            <h1>This is UserInfo</h1>
            <Form className="m-5">
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  성명
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={e => this.inputChangeHandler(e)}
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  이메일 주소
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={e => this.inputChangeHandler(e)}
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  생년월일
                </Label>
                <Col sm={10}>
                  <Input
                    onChange={e => this.inputChangeHandler(e)}
                    type="date"
                    name="birthday"
                    value={this.state.birthday}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  전화번호
                </Label>
                <Col sm={8}>
                  <Input
                    onChange={e => this.inputChangeHandler(e)}
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={this.state.phoneNumber}
                  />
                </Col>
                <div
                  className="btn btn-light col-sm-2"
                  onClick={() => this.phoneCert()}
                >
                  인증
                </div>
              </FormGroup>
              <div className="text-center">
                <Button onClick={this.submitHandler} className="m-5">
                  Submit
                </Button>
                <div onClick={() => this.certification()} className="btn m-5">
                  임시인증
                </div>
                <div onClick={() => this.noCertification()} className="btn m-5">
                  인증해제
                </div>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(UserInfo);
