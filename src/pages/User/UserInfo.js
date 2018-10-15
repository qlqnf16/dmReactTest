import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import { Form, FormGroup } from 'reactstrap';

class UserInfo extends Component {
  state = {
    name: this.props.userData.name,
    email: this.props.userData.email,
    birthday: this.props.userData.birthday,
    phoneNumber: this.props.userData.phoneNumber,
    gender: this.props.userData.gender
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
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender
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
      <div className="container-fluid u">
        <div className="d-flex">
          <UserNav />
          <div className="u_bg">
            <Form className="u_container">
              <div className="u_title">회원정보관리</div>
              <div className="uif_container">
                <p className="uif_title">회원정보 수정</p>
                <FormGroup row>
                  <div className="col-2 if_head uif_head ">성명</div>
                  <div className="col-10 d-flex justify-content-left">
                    <input
                      onChange={e => this.inputChangeHandler(e)}
                      type="text"
                      name="name"
                      id="name"
                      value={this.state.name}
                      className="if_input"
                    />
                    <label
                      className={
                        this.state.gender === 'male'
                          ? 'if_gradio active'
                          : 'if_gradio'
                      }
                    >
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        onChange={e => this.inputChangeHandler(e)}
                        className="genderRadio"
                      />
                      남
                    </label>
                    <label
                      className={
                        this.state.gender === 'female'
                          ? 'if_gradio active'
                          : 'if_gradio'
                      }
                    >
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        onChange={e => this.inputChangeHandler(e)}
                        className="genderRadio"
                      />
                      여
                    </label>
                  </div>
                </FormGroup>
                {/* <div>
                <label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={e => this.inputChangeHandler(e)}
                  />
                  남 // className="genderRadio"
                </label>
                <label>s
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={e => this.inputChangeHandler(e)}
                  />
                  여
                </label>
              </div> */}
                <FormGroup row>
                  <div className="col-2 if_head uif_head">이메일 주소</div>
                  <div className="col-10">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={e => this.inputChangeHandler(e)}
                      value={this.state.email}
                      className="if_input"
                    />
                  </div>
                </FormGroup>
                <FormGroup row>
                  <div className="col-2 if_head uif_head">생년월일</div>
                  <div className="col-10">
                    <div className="row m-0">
                      <select className="col-md-2 col-4">
                        <option>4월</option>
                        <option>10월</option>
                        <option>12월</option>
                      </select>
                      <select className="col-md-2 col-4">
                        <option>21일</option>
                        <option>27일</option>
                        <option>10일</option>
                      </select>
                      <select className="col-md-2 col-4">
                        <option>1994</option>
                        <option>1995</option>
                        <option>1996</option>
                      </select>
                    </div>
                    {/* <input
              type="date"
              name="birthday"
              id="birthday"
              onChange={e => this.inputChangeHandler(e)}
              value={this.state.birthday}
            /> */}
                    <div
                      className="if_detail"
                      style={{ marginTop: '1rem', marginBottom: '1rem' }}
                    >
                      이 정보는 통계 목적으로 사용되며 외부에 공개되지 않습니다.
                    </div>
                  </div>
                </FormGroup>
                <FormGroup row>
                  <div className="col-2 if_head uif_head">전화번호</div>
                  <div className="col-9">
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={e => this.inputChangeHandler(e)}
                      value={this.state.phoneNumber}
                      className="if_input"
                    />
                  </div>
                  <div
                    className="btn uif_button uif_phone col-1"
                    onClick={() => this.phoneCert()}
                  >
                    인증
                  </div>
                </FormGroup>

                <div className="text-center">
                  <div onClick={this.submitHandler} className=" btn uif_button">
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1.4rem'
                      }}
                    >
                      저장하기
                    </span>
                  </div>
                </div>
                <div onClick={() => this.certification()} className="btn m-5">
                  임시인증
                </div>
                <div onClick={() => this.noCertification()} className="btn m-5">
                  인증해제
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(UserInfo);
