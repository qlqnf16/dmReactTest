import firebaseApp from 'firebase';
import firebase from '../config/Firebase';
import axios from '../config/Axios';

export const facebookLogin = async () => {
  const provider = new firebaseApp.auth.FacebookAuthProvider();

  try {
    await firebase.auth().signInWithPopup(provider);

    const currentUser = firebase.auth().currentUser;
    const { displayName, uid, email } = currentUser;
    const DBUserData = {
      _uid: uid,
      name: displayName
    };

    const Users = await axios.get('http://52.79.227.227:3030/users');
    let newUser = true;
    Users.data.some(user => {
      if (user._uid === uid) {
        newUser = false;
      }
      return user._uid === uid;
    });

    if (newUser) {
      const res = await axios.post(
        'http://52.79.227.227:3030/users',
        DBUserData
      );

      const firebaseUserData = {
        name: displayName,
        uid,
        email,
        _id: res.data._id,
        joinedDate: new Date().getTime(),
        penalty: 0
      };

      await firebase
        .database()
        .ref('users/' + uid)
        .update(firebaseUserData);
    }
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    if (errorCode === 'auth/account-exists-with-different-credential')
      alert(
        '이미 다른 플랫폼으로 가입한 적이 있는 이메일입니다. 해당 플랫폼으로 로그인해주세요.'
      );
  }
};

export const googleLogin = async () => {
  const provider = new firebaseApp.auth.GoogleAuthProvider();
  try {
    await firebase.auth().signInWithPopup(provider);
    const currentUser = firebase.auth().currentUser;
    const { displayName, uid, email } = currentUser;

    const DBUserData = {
      _uid: uid,
      name: displayName
    };

    const Users = await axios.get('http://52.79.227.227:3030/users');
    let newUser = true;
    Users.data.some(user => {
      if (user._uid === uid) {
        newUser = false;
      }
      return user._uid === uid;
    });
    if (newUser) {
      const res = await axios.post(
        'http://52.79.227.227:3030/users',
        DBUserData
      );

      const firebaseUserData = {
        name: displayName,
        uid,
        email,
        _id: res.data._id,
        joinedDate: new Date().getTime(),
        penalty: 0
      };

      await firebase
        .database()
        .ref('users/' + uid)
        .update(firebaseUserData);
    }
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    if (errorCode === 'auth/account-exists-with-different-credential')
      alert(
        '이미 다른 플랫폼으로 가입한 적이 있는 이메일입니다. 해당 플랫폼으로 로그인해주세요.'
      );
  }
};

export const kakao_login_success = async (response, a) => {
  // 카카오톡 로그인으로 카카오톡 토큰 발급
  const userToken = { userToken: response.response.access_token };

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

    const DBUserData = {
      _uid: data.uuid,
      name: data.properties.nickname
    };

    const Users = await axios.get('http://52.79.227.227:3030/users');
    let newUser = true;
    Users.data.some(user => {
      if (user._uid === data.uuid) {
        newUser = false;
      }
      return user._uid === data.uuid;
    });
    if (newUser) {
      const response = await axios.post(
        'http://52.79.227.227:3030/users',
        DBUserData
      );
      const firebaseUserData = {
        name: data.properties.nickname,
        uid: data.uuid,
        _id: response.data._id,
        joinedDate: new Date().getTime(),
        penalty: 0
      };

      await firebase
        .database()
        .ref('users/' + data.uuid)
        .update(firebaseUserData);
    }
  } catch (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
    if (errorCode === 'auth/account-exists-with-different-credential')
      alert(
        '이미 다른 플랫폼으로 가입한 적이 있는 이메일입니다. 해당 플랫폼으로 로그인해주세요.'
      );
  }
};

export const kakao_login_fail = () => {};
