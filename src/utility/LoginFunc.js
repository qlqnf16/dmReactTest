import firebaseApp from 'firebase';
import firebase from '../config/Firebase';

import axios from '../config/Axios';

export const facebookLogin = async () => {
  const provider = new firebaseApp.auth.FacebookAuthProvider();

  try {
    await firebase.auth().signInWithPopup(provider);
    const currentUser = firebase.auth().currentUser;
    const { displayName, uid, email } = currentUser;
    const userData = { name: displayName, age: null, uid, email };

    await firebase
      .database()
      .ref('users/' + uid)
      .set(userData);
  } catch (error) {
    console.log(error);
  }
};

export const googleLogin = async () => {
  const provider = new firebaseApp.auth.GoogleAuthProvider();

  try {
    await firebase.auth().signInWithPopup(provider);
    const currentUser = firebase.auth().currentUser;
    const { displayName, uid, email } = currentUser;
    const userData = { name: displayName, age: null, uid, email };

    await firebase
      .database()
      .ref('users/' + uid)
      .set(userData);
  } catch (error) {
    console.log(error);
  }
};

export const kakao_login_success = async response => {
  // 카카오톡 로그인으로 카카오톡 토큰 발급
  const userToken = { userToken: response.response.access_token };
  console.log(userToken);

  try {
    // 카카오톡 토큰을 node 서버에 전달
    const res = await axios.post(
      'http://52.79.227.227:3030/kakao_login',
      userToken
    );

    // 서버에서 customToken 넘겨 받기
    const customToken = res.data.token;
    const data = res.data.userData;

    // 넘겨받은 토큰으로 커스텀 로그인
    await firebase.auth().signInWithCustomToken(customToken);

    const userData = {
      name: data.properties.nickname,
      age: null,
      uid: data.uuid
    };
    await firebase
      .database()
      .ref('users/' + data.uuid)
      .set(userData);
  } catch (error) {
    console.log(error);
  }
};

export const kakao_login_fail = error => {
  console.log(error);
};
