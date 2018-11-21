import React, { Component, Fragment } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import KakaoLogin from 'react-kakao-login';
// import KaKaoKey from '../../../config/Kakao';

import * as actions from '../../../modules';
import * as LoginFunc from '../../../utility/LoginFunc';

import googleLoginButton from '../../../assets/images/login_google.png';
import facebookLoginButton from '../../../assets/images/login_fb.png';
import kakaoLoginButton from '../../../assets/images/login_katalk.png';
import googleSignUpButton from '../../../assets/images/join_google.png';
import facebookSignUpButton from '../../../assets/images/join_fb.png';
import kakaoSignUpButton from '../../../assets/images/join_katalk.png';
import './MyModal.css';
import KakaoKey from '../../../config/Kakao';

class MyModal extends Component {
  constructor(props) {
    super(props);
    if (!window.Kakao.Auth) {
      // Kakao SDK Must be Initialized in Here...
      window.Kakao.init(KakaoKey);
    }
  }

  state = {
    title: '',
    text: '',
    subTitle: '',
    firstRender: false
  };

  componentDidMount = () => {
    if (!this.state.firstRender) {
      this.props.type === 'login'
        ? this.changeToLogin()
        : this.changeToSignUp();
    }
  };

  changeToLogin = () => {
    this.setState({
      title: '로그인',
      text: '아직 드리머리 회원이 아니신가요?',
      subText: ' 후, 맞춤 헤어 서비스를 받아보세요',
      subTitle: null,
      isLogin: true,
      infoPolicy: true,
      termsOfUse: true
    });
  };
  changeToSignUp = () => {
    this.setState({
      title: '환영합니다',
      text: '이미 드리머리 계정이 있나요? ',
      subText: null,
      subTitle: '간단한 회원가입으로 서비스를 이용해보세요',
      isLogin: false,
      infoPolicy: false,
      termsOfUse: false
    });
  };

  checkboxHandler = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.checked
    });
  };

  login = async type => {
    if (this.state.infoPolicy && this.state.termsOfUse) {
      switch (type) {
        case 'google':
          this.props.off();
          LoginFunc.googleLogin();
          break;
        case 'facebook':
          this.props.off();
          LoginFunc.facebookLogin();
          break;
        case 'kakao':
          this.props.off();
          // 0부터 카운터를 증가시키며 0,1,2 총 3번 시도 후 실패시 로깅
          LoginFunc.kakaoLogin(0);

          break;

        default:
          break;
      }
    } else {
      alert('필수 항목을 체크해주세요');
    }
  };

  click = () => {
    this.props.off();
    if (this.props.click) this.props.click();
  };

  render() {
    let subTitle = null;
    if (!this.state.isLogin) {
      subTitle = <div className="modal_subtitle">{this.state.subTitle}</div>;
    }

    let check = null;
    if (!this.state.isLogin)
      check = (
        <div className="modal_check">
          <div className="row justify-content-start modal_checkbox">
            <div>
              <input
                type="checkbox"
                id="termsOfUse"
                name="termsOfUse"
                onChange={this.checkboxHandler}
              />
              <label htmlFor="termsOfUse" />
            </div>
            <div
              style={{
                fontSize: '1.1rem',
                color: '#1f3354',
                lineHeight: '2',
                marginLeft: '0.5rem'
              }}
            >
              <Link to="/TermsOfUse" onClick={() => this.click()}>
                이용약관
              </Link>
              에 동의합니다(필수)
            </div>
          </div>
          <div className="row justify-content-start modal_checkbox">
            <div>
              <input
                type="checkbox"
                id="infoPolicy"
                name="infoPolicy"
                onChange={this.checkboxHandler}
              />
              <label htmlFor="infoPolicy" />
            </div>
            <div
              style={{
                fontSize: '1.1rem',
                color: '#1f3354',
                lineHeight: '2',
                paddingLeft: '0.5rem'
              }}
            >
              <Link to="/InfoPolicy" onClick={() => this.click()}>
                개인정보 수집, 이용
              </Link>
              에 동의합니다(필수)
            </div>
          </div>
        </div>
      );
    return (
      <div>
        <Modal
          centered
          isOpen={this.props.showLogin}
          fade={false}
          toggle={this.props.off}
          className="p-4"
        >
          <ModalBody className="p-5  text-center">
            {/* Modal header */}
            <div className="modal_header">
              <div
                className="modal_title"
                style={this.state.isLogin ? null : { textAlign: 'left' }}
              >
                {this.state.title}
              </div>
              {subTitle}
            </div>

            {/* Modal Button */}

            {/* 구글 로그인 비활성화 */}
            {/* <div className="btn modal_b" onClick={() => this.login('google')}>
              <img
                src={
                  this.state.isLogin ? googleLoginButton : googleSignUpButton
                }
                alt="alt"
                className="modal_button"
              />
            </div>
            <div className="btn modal_b" onClick={() => this.login('facebook')}>
              <img
                src={
                  this.state.isLogin
                    ? facebookLoginButton
                    : facebookSignUpButton
                }
                alt="alt"
                className="modal_button"
              />
            </div> */}

            {/* 카카오 로그인 by heeham */}
            <div
              className="btn modal_b"
              onClick={e => {
                e.preventDefault();
                this.login('kakao');
              }}
            >
              <img
                src={this.state.isLogin ? kakaoLoginButton : kakaoSignUpButton}
                alt="alt"
                className="modal_button"
              />
            </div>

            {/* 카카오 로그인 일시적 사용 금지 */}

            {/* <KakaoLogin
              jsKey={KaKaoKey}
              onSuccess={LoginFunc.kakao_login_success}
              onFailure={LoginFunc.kakao_login_fail}
              getProfile={true}
              render={props => (
                <div
                  className="btn modal_b"
                  onClick={e => {
                    e.preventDefault();
                    this.login('kakao', props);
                  }}
                >
                  <img
                    src={
                      this.state.isLogin ? kakaoLoginButton : kakaoSignUpButton
                    }
                    alt="alt"
                    className="modal_button"
                  />
                </div>
              )}
            /> */}

            {/* Modal check */}
            {check}

            {/* Modal footer */}
            <div className="modal_footer">
              {this.state.isLogin ? (
                <Fragment>
                  <p>{this.state.text}</p>
                  <p>
                    <span
                      className="btn p-0"
                      onClick={this.changeToSignUp}
                      style={{
                        color: '#dd6866',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >
                      회원가입
                    </span>
                    {this.state.subText}
                  </p>
                </Fragment>
              ) : (
                <p>
                  {this.state.text}
                  <span
                    onClick={this.changeToLogin}
                    style={{
                      color: '#dd6866',
                      fontWeight: 'bold',
                      fontSize: '1.2rem'
                    }}
                    className="btn p-0"
                  >
                    로그인
                  </span>
                </p>
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { sangwoo: state.sangwoo };
};

export default connect(
  mapStateToProps,
  actions
)(MyModal);
