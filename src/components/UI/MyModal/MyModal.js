import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import KakaoLogin from 'react-kakao-login';

import firebaseApp from 'firebase';
import firebase from '../../../config/Firebase';
import axios from '../../../config/Axios';
import KaKaoKey from '../../../config/Kakao';

class MyModal extends Component {
  state = {
    title: '',
    text: '',
    subTitle: '',
    firstRender: false
  };

  componentDidlMount = () => {
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

  success = response => {
    // 카카오톡 로그인으로 카카오톡 토큰 발급
    const userToken = { userToken: response.response.access_token };
    console.log(userToken);

    // 카카오톡 토큰을 node 서버에 전달
    axios
      .post('http://52.79.227.227:3030/kakao_login', userToken)
      .then(res => {
        //서버에서 customToken 넘겨 받기
        const customToken = res.data.token;
        const data = res.data.userData;
        // 넘겨받은 토큰으로 커스텀 로그인
        firebase
          .auth()
          .signInWithCustomToken(customToken)
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });

        // 유저 데이터도 받아서 DB에 넣어봅시다
        console.log(data.properties.nickname);
        const userData = {
          name: data.properties.nickname,
          age: null,
          uid: data.uuid
        };
        firebase
          .database()
          .ref('users/' + data.uuid)
          .set(userData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  failure = error => {
    console.log(error);
  };

  changeToLogin = () => {
    this.setState({
      title: '로그인',
      text: '아직 드리머리 회원이 아니신가요?',
      subTitle: null
    });
  };
  changeToSignUp = () => {
    this.setState({
      title: '회원가입',
      text: '이미 드리머리 계정이 있나요?',
      subTitle: '간단한 회원가입으로 서비스를 이용해보세요'
    });
  };

  googleLogin = () => {
    const provider = new firebaseApp.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const currentUser = firebase.auth().currentUser;
        const userData = {
          name: currentUser.displayName,
          age: null,
          uid: currentUser.uid,
          email: currentUser.email,
          isD: true,
          // 임시로.
          isRegiser: true
        };
        firebase
          .database()
          .ref('users/' + currentUser.uid)
          .set(userData);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  facebookLogin = () => {
    const provider = new firebaseApp.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const currentUser = firebase.auth().currentUser;
        const userData = {
          name: currentUser.displayName,
          age: null,
          uid: currentUser.uid,
          email: currentUser.email,
          isD: true
        };
        firebase
          .database()
          .ref('users/' + currentUser.uid)
          .set(userData);
      })
      .catch(function(error) {
        console.log(error);
      });
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
              onClick={this.googleLogin}
            >
              구글 {this.state.title}
            </button>
            <button
              className="btn btn-light d-block w-100"
              onClick={this.facebookLogin}
            >
              페이스북 {this.state.title}
            </button>
            <KakaoLogin
              className="btn btn-light d-block w-100"
              jsKey={KaKaoKey}
              onSuccess={this.success}
              onFailure={this.failure}
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

export default MyModal;
