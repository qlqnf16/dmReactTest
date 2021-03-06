import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';
import UserNav from '../../components/Navigation/UserNav/UserNav';
import { Form, FormGroup } from 'reactstrap';
import check_sm from '../../assets/images/check_sm.png';
import axios from '../../config/Axios';
import CouponContent from '../../components/CouponContent/CouponContent';
class UserInfo extends Component {
  constructor(props) {
    super(props);
    const {
      name,
      email,
      birthday,
      phoneNumber,
      gender,
      recommendationCode,
      isRegister
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
      isRegister
    };

    if (this.props.location.pathname.includes('reservation'))
      alert("휴대폰 인증 후 예약서비스를 사용할 수 있습니다'");
  }

  componentDidMount = () => {
    // iamport 사용하기 위한 inline script 작성
    let links = [
      'https://code.jquery.com/jquery-1.12.4.min.js',
      'https://cdn.iamport.kr/js/iamport.payment-1.1.5.js'
    ];

    // for (let link of links) {
    //   const script = document.createElement('script');

    //   script.src = link;
    //   script.async = true;
    //   document.body.appendChild(script);
    // }
    if (this.state.recommendationCode) this.recommendationInput.disabled = true;
    const { IMP } = window;
    IMP.init('imp06037656');
    this.IMP = IMP;
  };

  inputChangeHandler = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (target.type === 'checkbox') {
      this.setState({ [name]: target.checked });
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
    if (!this.state.isRegister) return alert('휴대폰 인증을 먼저 해주세요');

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
      if (!result || recommendationCode == this.props.userData.uid) {
        alert('유효하지 않은 추천인 코드 입니다.');
      } else {
        let { recommendation, _id, isD } = result.val();
        if (isD)
          return alert(
            '예비 디자이너를 추천인으로 작성하는 것은 승인 완료된 예비 디자이너만 가능합니다! 아직 승인 대기중이시라면 승인 후에 다시 작성해주세요!!'
          );
        // 유효한 추천인 코드면 포인트 증가

        if (recommendation) count = recommendation;
        firebaseUserData = { ...firebaseUserData, recommendationCode };
        count += 1;
        await axios.patch(`users/${_id}/addpoint`, { point: 1000 });

        // 자기 자신도 포인트 증가
        await axios.patch(`users/${this.props.userData._id}/addpoint`, {
          point: 1000
        });

        await firebase
          .database()
          .ref('users/' + recommendationCode)
          .update({
            recommendation: count
          });
      }
    } else if (recommendationCode && this.props.userData.recommendationCode) {
      alert('추천인 코드는 한번만 작성할 수 있습니다.');
    }
    try {
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
    if (!this.state.phoneNumberAgree)
      return alert('먼저 개인정보 제공에 동의해주세요');

    this.IMP.certification(
      {
        merchant_uid: 'merchant_' + new Date().getTime()
      },
      async rsp => {
        if (rsp.success) {
          // 인증성공

          // console.log(rsp.imp_uid);
          const response = await axios.post(`certification`, {
            imp_uid: rsp.imp_uid
          });

          // console.log(response);

          this.setState({
            phoneNumber: response.data.data.phone,
            isRegister: true
          });
          // this.setState({ isRegister: true });
          alert('인증되었습니다');
        } else {
          // 인증취소 또는 인증실패
          var msg = '인증에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
          alert(msg);
        }
      }
    );
  };

  render() {
    let isRegister = '';
    if (!this.state.isRegister) {
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
          <option value="null">-년도-</option>
          {y}
        </select>
        <select
          className="col-2 col-4"
          name="month"
          value={this.state.month}
          onChange={e => this.inputChangeHandler(e)}
        >
          <option value="null">-월-</option>
          {m}
        </select>
        <select
          className="col-2 col-4"
          name="day"
          value={this.state.day}
          onChange={e => this.inputChangeHandler(e)}
        >
          <option value="null">-일-</option>
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
                  <div className="col-10">
                    <div className="d-flex justify-content-left">
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
                    <div className="if_detail" style={{ marginBottom: '1rem' }}>
                      예약에 사용되는 이름인 실명을 사용해주세요
                    </div>
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
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={e => this.inputChangeHandler(e)}
                      value={this.state.phoneNumber}
                      className="if_input"
                      disabled
                      placeholder="오른쪽의 인증버튼을 눌러주세요"
                      style={
                        !this.state.phoneNumber
                          ? { backgroundColor: 'rgba(0,0,0,0.1)' }
                          : null
                      }
                    />
                    <div className="if_detail" style={{ marginTop: '8.3px' }}>
                      <input
                        type="checkbox"
                        id="phoneNumberAgree"
                        name="phoneNumberAgree"
                        onChange={e => this.inputChangeHandler(e)}
                      />
                      <label
                        htmlFor="phoneNumberAgree"
                        style={{ marginLeft: '0.5rem' }}
                      >
                        휴대폰 번호 수집에 대한 개인정보 제공에 동의합니다.
                      </label>
                    </div>
                  </div>
                  {isRegister}
                </FormGroup>
                <FormGroup row>
                  <div className="col-2 if_head uif_head ">추천인 코드</div>
                  <div className="col-10 justify-content-left">
                    <input
                      onChange={
                        this.props.userData.recommendationCode
                          ? null
                          : e => this.inputChangeHandler(e)
                      }
                      type="text"
                      name="recommendationCode"
                      id="recommendationCode"
                      ref={ref => (this.recommendationInput = ref)}
                      value={
                        this.props.userData.recommendationCode
                          ? this.props.userData.recommendationCode
                          : this.state.recommendationCode
                      }
                      className="if_input"
                      style={
                        this.props.userData.recommendationCode
                          ? {
                              backgroundColor: 'rgba(0,0,0,0.1)',
                              color: 'rgba(0,0,0,0.5)'
                            }
                          : null
                      }
                    />
                    <div
                      className="if_detail"
                      style={{
                        marginTop: '0.6rem',
                        marginBottom: '0.6rem',
                        fontSize: '1.2rem'
                      }}
                    >
                      친구가 내 추천인 코드 입력하면 친구도 나도 1000포인트씩
                      지급!
                    </div>
                    <div
                      className="if_detail"
                      style={{
                        marginTop: '0.6rem',
                        marginBottom: '0.6rem',
                        fontSize: '1.2rem'
                      }}
                    >
                      내 추천인 코드: {this.props.userData.uid}
                    </div>
                  </div>
                </FormGroup>

                <div className="text-center">
                  <div onClick={this.submitHandler} className=" btn uif_button">
                    <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                      저장하기
                    </span>
                  </div>
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
