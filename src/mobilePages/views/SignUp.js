import React, { Component } from 'react';
import axios from '../../config/Axios';
import firebase from '../../config/Firebase';
import { connect } from 'react-redux';

import Step2 from '../components/SignUp/Step2';
import Step1 from '../components/SignUp/Step1';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import './SignUp.css';

//=======================================
// steppers
//=======================================

function getSteps() {
  return ['휴대폰 인증', '회원정보 입력'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Step1 />;
    case 1:
      return <Step2 />;
    default:
      return 'Unknown step';
  }
}

//=======================================
//=======================================

class SignUp extends Component {
  state = {
    phoneNumberAgree: false,

    // steppers starts here
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  // stepper ends here

  componentDidMount = () => {
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

  click = () => {
    this.setState({ nextStep: !this.state.nextStep });
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
          //// 인증성공
          // 서버에 인증정보 요청
          const response = await axios.post(`certification`, {
            imp_uid: rsp.imp_uid
          });

          console.log(response.data.data);
          const { phone, name, birth, gender } = response.data.data;
          this.setState({
            phoneNumber: phone,
            birth: birth * 1000,
            gender,
            name,
            nextStep: true
          });

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

  submitHandler = async () => {
    const { uid } = firebase.auth().currentUser;
    const {
      name,
      email,
      phoneNumber,
      gender,
      recommendationCode,
      birth
    } = this.state;
    const year = String(new Date(birth).getFullYear());
    const month = String(new Date(birth).getMonth() + 1);
    const day = String(new Date(birth).getDate());
    let firebaseUserData = {
      name,
      email,
      birthday: {
        year,
        month,
        day
      },
      phoneNumber,
      gender,
      isRegister: true
    };

    console.log(firebaseUserData);

    if (!firebaseUserData.email) return alert('이메일 주소를 입력해주세요');

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
    }

    try {
      await firebase
        .database()
        .ref('users/' + uid)
        .update(firebaseUserData);

      await axios.patch(`users/${this.props.userData._id}`, { name });
      alert('저장되었습니다!');
    } catch (err) {
      console.log(err);
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요.');
    }
  };

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;
    // let step = this.state.nextStep ? (
    //   <Step2
    //     inputChangeHandler={this.inputChangeHandler}
    //     state={this.state}
    //     submitHandler={this.submitHandler}
    //   />
    // ) : (
    //   <Step1
    //     inputChangeHandler={this.inputChangeHandler}
    //     phoneCert={this.phoneCert}
    //   />
    // );
    return (
      <div className="container">
        {/* {step}
        <div className="btn" onClick={() => this.click()}>
          왔다갔다
        </div> */}
        <div>
          <Stepper
            style={{ padding: '24px 0' }}
            activeStep={activeStep}
            orientation="vertical"
          >
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 'bold'
                      }}
                    >
                      {label}
                    </span>
                  </StepLabel>
                  <StepContent>
                    <Typography>{getStepContent(index)}</Typography>
                    <div>
                      <div style={{ textAlign: 'right' }}>
                        {/* <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          style={{ fontSize: '1.4rem' }}
                        >
                          뒤로
                        </Button> */}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          style={{ fontSize: '1.4rem' }}
                        >
                          {activeStep === steps.length - 1 ? '완료' : '다음'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0}>
              <Typography>
                드리머리 회원이 되신 것을 진심으로 축하합니다.
              </Typography>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};

export default connect(mapStateToProps)(SignUp);
