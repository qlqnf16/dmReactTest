import React, { Component } from 'react';
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
      .update({ isRegiser: true });
  }
  noCertification() {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({ isRegiser: false });
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
                    type="text"
                    name="name"
                    id="name"
                    value={firebase.auth().currentUser.name}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  이메일 주소
                </Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={firebase.auth().currentUser.email}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  전화번호
                </Label>
                <Col sm={8}>
                  <Input type="text" name="phone" id="phoneNumber" />
                </Col>
                <div
                  className="btn btn-light col-sm-2"
                  onClick={() => this.phoneCert()}
                >
                  인증
                </div>
              </FormGroup>
              <div className="text-center">
                <Button className="m-5">Submit</Button>
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

export default UserInfo;
