import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import firebase from "../../../config/Firebase";
import axios from "axios";

import MyPageNavigationBar from "../../components/MyPageNavigationBar/MyPageNavigationBar";
import UserInfoForm from "../../components/CustomerMypage/UserInfo/UserInfoForm";

class UserInfo extends Component {
  constructor(props) {
    super(props);

    //redux에서 정보 받아서 state에 넣기
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
    const { value, name } = event.target;
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
    if (!this.props.userData.isRegister)
      return alert("휴대폰 인증을 진행해주세요");

    // 추천인 로직
    // 전에 추천인을 입력한 적이 없고, 추천인을 작성했을 때,
    if (recommendationCode && !this.props.userData.recommendationCode) {
      let count = 0;
      let result = null;

      // 유효한 추천인 코드인지 확인
      await firebase
        .database()
        .ref("users/" + recommendationCode)
        .on("value", res => {
          result = res;
        });
      // 유효하지 않은 추천인 코드일 때,
      if (!result) alert("유효하지 않은 추천인 코드 입니다.");
      // 유효한 추천인 코드일 때,
      else {
        let { recommendation, _id } = result.val();
        if (recommendation) count = recommendation;
        firebaseUserData = { ...firebaseUserData, recommendationCode };
        count += 1;

        // TODO : 추천 3회면 포인트 추가해주기
        // if (count === 3) {
        //   count = 0;
        await axios.patch(`http://52.79.227.227:3030/users/${_id}/addpoint`);
        // }

        // 추천받은 횟수 저장
        await firebase
          .database()
          .ref("users/" + recommendationCode)
          .update({ recommendation: count });
      }
    }
    // 최종 유저정보 저장
    await firebase
      .database()
      .ref("users/" + uid)
      .update(firebaseUserData);
    await alert("저장되었습니다!");
  };

  render() {
    return (
      <Fragment>
        <MyPageNavigationBar />
        <div className="m_containerStyle">
          <UserInfoForm
            inputChangeHandler={this.inputChangeHandler}
            userData={this.state}
            submitHandler={this.submitHandler}
          />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(UserInfo);
