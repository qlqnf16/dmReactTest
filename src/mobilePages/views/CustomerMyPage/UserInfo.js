import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import firebase from '../../../config/Firebase';
import axios from '../../../config/Axios';

import MyPageNavigationBar from '../../components/MyPageNavigationBar/MyPageNavigationBar';
import UserInfoForm from '../../components/CustomerMypage/UserInfo/UserInfoForm';

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
      recommendationCode,
      isRegister,
      uid
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
      recommendationCode,
      isRegister,
      uid
    };

    if (this.props.location.pathname.includes('reservation'))
      alert("휴대폰 인증 후 예약서비스를 사용할 수 있습니다'");
  }

  componentDidMount = async () => {
    // iamport 사용하기 위한 inline script 작성
    let links = [
      'https://code.jquery.com/jquery-1.12.4.min.js',
      'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
    ];

    for (let link of links) {
      const script = document.createElement('script');

      script.src = link;
      script.async = true;
      document.body.appendChild(script);
    }
  };

  inputChangeHandler = event => {
    const { value, name, type, checked } = event.target;
    if (type === 'checkbox') {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
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
      recommendationCode,
      isRegister
    } = this.state;
    let firebaseUserData = {
      name,
      birthday: { year, month, day },
      email,
      phoneNumber,
      gender,
      isRegister
    };
    if (!firebaseUserData.name) return alert('이름을 작성해주세요');
    if (!firebaseUserData.gender) return alert('성별을 작성해주세요');
    if (!firebaseUserData.email) return alert('이메일을 작성해주세요');
    if (
      Object.values(firebaseUserData.birthday).includes('null') ||
      Object.values(firebaseUserData.birthday).includes(undefined)
    )
      return alert('생년월일을 작성해주세요');
    if (!firebaseUserData.phoneNumber)
      return alert('휴대폰 번호를 작성해주세요');
    if (firebaseUserData.phoneNumber.length !== 11)
      return alert('정확한 휴대폰 번호를 입력해주세요');
    if (!this.state.isRegister) return alert('휴대폰 인증을 진행해주세요');

    //// 추천인 로직
    // 전에 추천인을 입력한 적이 없고, 추천인을 작성했을 때,
    if (recommendationCode && !this.props.userData.recommendationCode) {
      let count = 0;
      let result = null;

      // 유효한 추천인 코드인지 확인
      const fbPromise = new Promise(resolve => {
        firebase
          .database()
          .ref('users/' + recommendationCode)
          .on('value', res => {
            if (res.val()) resolve(res);
            else resolve(false);
          });
      });
      result = await fbPromise;
      // 유효하지 않은 추천인 코드일 때,
      if (!result || recommendationCode == this.props.userData.uid)
        alert('유효하지 않은 추천인 코드 입니다.');
      // 유효한 추천인 코드일 때,
      else {
        let { recommendation, _id, isD } = result.val();
        if (isD)
          return alert(
            '예비 디자이너를 추천인으로 제출하는 것은 본인이 예비 디자이너일 경우에만 가능합니다! 먼저 예디 등록을 진행해주세요!!'
          );

        if (recommendation) count = recommendation;
        firebaseUserData = { ...firebaseUserData, recommendationCode };
        count += 1;

        //추천받은 사람 포인트 증가
        await axios.patch(`users/${_id}/addpoint`, {
          point: 1000
        });

        // 자기 자신도 포인트 증가
        await axios.patch(`users/${this.props.userData._id}/addpoint`, {
          point: 1000
        });
        // 추천받은 횟수 저장
        await firebase
          .database()
          .ref('users/' + recommendationCode)
          .update({ recommendation: count });
      }
    }
    try {
      // 최종 유저정보 저장
      // 한번 추천 한 경우 다시 추천 못하도록 본인이 추천한 코드 firebase에 저장
      await firebase
        .database()
        .ref('users/' + uid)
        .update(firebaseUserData);
      await axios.patch(`users/${this.props.userData._id}`, { name });

      alert('저장되었습니다!');
    } catch (err) {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요.');
    }
  };

  phoneCert = () => {
    if (!this.state.phoneNumber) return alert('휴대폰 번호를 먼저 입력하세요');
    if (!this.state.phoneNumberAgree)
      return alert('먼저 개인정보 제공에 동의해주세요');

    const { IMP } = window;
    IMP.init('imp06037656');
    IMP.certification(
      {
        merchant_uid: 'merchant_' + new Date().getTime()
      },
      async rsp => {
        try {
          if (rsp.success) {
            // 인증성공
            const response = await axios.post(`certification`, {
              imp_uid: rsp.imp_uid
            });

            this.setState({
              phoneNumber: response.data.data.phone,
              isRegister: true
            });
            alert('인증되었습니다');
          } else {
            // 인증취소 또는 인증실패
            var msg = '인증에 실패하였습니다.';
            msg += '에러내용 : ' + rsp.error_msg;
            alert(msg);
          }
        } catch (e) {
          alert(e);
        }
      }
    );
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
            phoneCert={this.phoneCert}
            recommendationCode={this.props.userData.recommendationCode}
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
