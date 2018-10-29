import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import { Form, FormGroup } from 'reactstrap';
import check_sm from '../../assets/images/check_sm.png';
import axios from 'axios';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      email,
      birthday,
      phoneNumber,
      gender,
      recommendationCode
    } = this.props.userData;
    this.state = {
      name,
      email,
      birthday,
      phoneNumber,
      gender,
      year: birthday && birthday.year,
      month: birthday && birthday.month,
      day: birthday && birthday.day,
      recommendationCode
    };
  }

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  submitHandler = async () => {
    const { uid } = firebase.auth().currentUser;
    const {
      name,
      year,
      month,
      day,
      email,
      phoneNumber,
      gender,
      recommendationCode
    } = this.state;
    let firebaseUserData = {
      name,
      birthday: { year, month, day },
      email,
      phoneNumber,
      gender
    };
    console.log(firebaseUserData);
    if (!this.props.userData.isRegister)
      return alert('휴대폰 인증을 진행해주세요');
    if (
      Object.values(firebaseUserData) === undefined ||
      Object.values(firebaseUserData.birthday) === undefined
    )
      return alert('채워지지 않은 정보가 있습니다');
    if (recommendationCode && !this.props.userData.recommendationCode) {
      let count = 0;
      let result = null;
      await firebase
        .database()
        .ref('users/' + recommendationCode)
        .on('value', res => {
          result = res;
        });
      if (!result || recommendationCode === this.props.userData.uid) {
        alert('유효하지 않은 추천인 코드 입니다.');
      } else {
        let { recommendation, _id } = result.val();
        if (recommendation) count = recommendation;
        firebaseUserData = { ...firebaseUserData, recommendationCode };
        count += 1;

        // if (count === 3) {
        //   count = 0;
        await axios.patch(`http://52.79.227.227:3030/users/${_id}/addpoint`);
        // }

        await firebase
          .database()
          .ref('users/' + recommendationCode)
          .update({ recommendation: count });
        console.log(firebaseUserData);
      }
    }
    await firebase
      .database()
      .ref('users/' + uid)
      .update(firebaseUserData);
    await alert('저장되었습니다!');
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
    let isRegister = '';
    if (!this.props.userData.isRegister) {
      isRegister = (
        <div
          className="btn uif_button uif_phone col-1"
          onClick={() => this.phoneCert()}
        >
          인증
        </div>
      );
    } else {
      isRegister = (
        <div className="uif_registered col-1">
          <img style={{ width: '1.4rem' }} src={check_sm} alt="alt" />
          인증됨
        </div>
      );
    }
    // 달력 만들기
    let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let day = [];
    let year = [];
    for (let i = 1; i < 32; i++) {
      day.push(i);
    }
    for (let i = 2018; i > 1920; i--) {
      year.push(i);
    }
    if (['4', '6', '9', '11'].includes(this.state.month)) {
      day.pop();
    } else if (this.state.month === '2') {
      if (Number(this.state.year) % 4 === 0) {
        day.splice(29, 2);
      } else {
        day.splice(28, 3);
      }
    }
    let m = month.map((m, key) => (
      <option key={key} value={m}>
        {m}월
      </option>
    ));
    let d = day.map((d, key) => (
      <option key={key} value={d}>
        {d}일
      </option>
    ));
    let y = year.map((y, key) => (
      <option key={key} value={y}>
        {y}년
      </option>
    ));
    let calendar = (
      <div className="row m-0">
        <select
          className="col-2 col-4"
          name="year"
          value={this.state.year}
          onChange={e => this.inputChangeHandler(e)}
        >
          {y}
        </select>
        <select
          className="col-2 col-4"
          name="month"
          value={this.state.month}
          onChange={e => this.inputChangeHandler(e)}
        >
          {m}
        </select>
        <select
          className="col-2 col-4"
          name="day"
          value={this.state.day}
          onChange={e => this.inputChangeHandler(e)}
        >
          {d}
        </select>
      </div>
    );

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
                    {calendar}
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
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={e => this.inputChangeHandler(e)}
                      value={this.state.phoneNumber}
                      className="if_input"
                    />
                  </div>
                  {isRegister}
                </FormGroup>
                <FormGroup row>
                  <div className="col-2 if_head uif_head ">추천인 코드</div>
                  <div className="col-10 d-flex justify-content-left">
                    <input
                      onChange={
                        this.props.userData.recommendationCode
                          ? null
                          : e => this.inputChangeHandler(e)
                      }
                      type="text"
                      name="recommendationCode"
                      id="recommendationCode"
                      value={this.state.recommendationCode}
                      className="if_input"
                    />
                  </div>
                </FormGroup>

                <div className="text-center">
                  <div onClick={this.submitHandler} className=" btn uif_button">
                    <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
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
