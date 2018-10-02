import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import KakaoLogin from 'react-kakao-login';
import KaKaoKey from '../../../config/Kakao';

import { connect } from 'react-redux';
import * as actions from '../../../modules';
import * as LoginFunc from '../../../utility/LoginFunc';

class MyModal extends Component {
  state = {
    title: '',
    text: '',
    subTitle: '',
    firstRender: false
  };

  componentDidMount = () => {
    if (!this.state.firstRender) {
      this.props.type === 'login'
        ? this.setState({
            title: '로그인',
            text: '아직 드리머리 회원이 아니신가요??',
            subTitle: null,
            firstRender: true
          })
        : this.setState({
            title: '회원가입',
            text: '이미 드리머리 계정이 있나요?',
            subTitle: '간단한 회원가입으로 서비스를 이용해보세요',
            firstRender: true
          });
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.showLogin}
          fade={false}
          toggle={this.props.off}
        >
          <ModalHeader>
            <p className="h2">{this.state.title}</p>
            <p className="small mb-0">{this.state.subTitle}</p>
          </ModalHeader>
          <ModalBody className="text-center">
            <button
              className="btn btn-light d-block w-100"
              onClick={LoginFunc.googleLogin}
            >
              구글 {this.state.title}
            </button>
            <button
              className="btn btn-light d-block w-100"
              onClick={LoginFunc.facebookLogin}
            >
              페이스북 {this.state.title}
            </button>
            <KakaoLogin
              className="btn btn-light d-block w-100"
              jsKey={KaKaoKey}
              onSuccess={LoginFunc.kakao_login_success}
              onFailure={LoginFunc.kakao_login_success}
              getProfile={true}
              buttonText={`카카오톡 ${this.state.title}`}
            />
          </ModalBody>
          <ModalFooter>
            <p>{this.state.text}</p>
            {this.state.title === '로그인' ? (
              <p className="btn btn-light" onClick={this.changeToSignUp}>
                회원가입
              </p>
            ) : (
              <p className="btn btn-light" onClick={this.changeToLogin}>
                로그인
              </p>
            )}
          </ModalFooter>
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
