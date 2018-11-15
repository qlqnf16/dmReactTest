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

    const Users = await axios.get('users');
    let newUser = true;
    Users.data.some(user => {
      if (user._uid === uid) {
        newUser = false;
      }
      return user._uid === uid;
    });

    if (newUser) {
      const res = await axios.post('users', DBUserData);

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
    else {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요');
      window.location.reload();
    }
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

    const Users = await axios.get('users');
    let newUser = true;
    Users.data.some(user => {
      if (user._uid === uid) {
        newUser = false;
      }
      return user._uid === uid;
    });
    if (newUser) {
      const res = await axios.post('users', DBUserData);

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
    else {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요');
      window.location.reload();
    }
  }
};

// export const kakao_login_success = async (response, a) => {
//   // 카카오톡 로그인으로 카카오톡 토큰 발급
//   const userToken = { userToken: response.response.access_token };

//   try {
//     // 카카오톡 토큰을 node 서버에 전달
//     const res = await axios.post('kakao_login', userToken);

//     // 서버에서 customToken 넘겨 받기
//     const customToken = res.data.token;
//     const data = res.data.userData;
//     // 넘겨받은 토큰으로 커스텀 로그인
//     await firebase.auth().signInWithCustomToken(customToken);

//     const DBUserData = {
//       _uid: data.id,
//       name: data.properties.nickname
//     };
//     const Users = await axios.get('users');
//     let newUser = true;
//     Users.data.some(user => {
//       if (user._uid === String(data.id)) {
//         newUser = false;
//       }
//       return user._uid === String(data.id);
//     });
//     if (newUser) {
//       const response = await axios.post('users', DBUserData);
//       const firebaseUserData = {
//         name: DBUserData.name,
//         uid: DBUserData._uid,
//         _id: response.data._id,
//         joinedDate: new Date().getTime(),
//         penalty: 0
//       };

//       await firebase
//         .database()
//         .ref('users/' + data.id)
//         .update(firebaseUserData);
//     }
//   } catch (error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode, errorMessage);
//     if (errorCode === 'auth/account-exists-with-different-credential')
//       alert(
//         '이미 다른 플랫폼으로 가입한 적이 있는 이메일입니다. 해당 플랫폼으로 로그인해주세요.'
//       );
//     else {
//       alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요');
//       window.location.reload();
//     }
//   }
// };

// Modified by Heeham
// userToken 만 받는 식으로 바꾸고 코드 좀 간결하게 수정
export const kakao_login_success = async userToken => {
  try {
    // 카카오톡 토큰을 node 서버에 전달
    const {
      data: { token: customToken, userData: data }
    } = await axios.post('kakao_login', { userToken });

    // 넘겨받은 토큰으로 커스텀 로그인
    await firebase.auth().signInWithCustomToken(customToken);

    const DBUserData = {
      _uid: data.id,
      name: data.properties.nickname
    };
    const Users = await axios.get('users');
    let newUser = true;
    Users.data.some(user => {
      if (user._uid === String(data.id)) {
        newUser = false;
      }
      return user._uid === String(data.id);
    });
    if (newUser) {
      const response = await axios.post('users', DBUserData);
      const firebaseUserData = {
        name: DBUserData.name,
        uid: DBUserData._uid,
        _id: response.data._id,
        joinedDate: new Date().getTime(),
        penalty: 0
      };

      await firebase
        .database()
        .ref('users/' + data.id)
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
    else {
      alert('문제가 발생했습니다. 잠시 뒤에 다시 시도해주세요');
      // window.location.reload();
    }
  }
};

export const kakao_login_fail = () => {};

// 모든 에러처리는 여기서 하세요.
export const kakaoLogin = (loginCount, loginError) => {
  if (loginCount >= 3) {
    console.log(`Login Fail - ${loginError}`);
    // TODO: Logging Error to Server Or Do Something...
    return;
  }

  try {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.login({
        success: function(authObj) {
          // TODO with Auth Object - Enroll Access Token & Refresh Token
          // console.log(JSON.stringify(authObj, undefined, 2));
          // window.Kakao.Auth.getStatus(statusObj => {
          //   console.log(statusObj);
          // });
          kakao_login_success(authObj.access_token);
        },
        fail: function(error) {
          // 에러를 쓰로우하지 않고, 정상적인 에러라면 처리해도 될 듯...
          // e.g 우리 잘못이 아닌 카카오 서버 장애라던가...
          // 우리 서버 장애일수도 있고...
          throw new Error(`Kakao Login Error - ${JSON.stringify(error)}`);
        }
      });
    } else {
      // 이건 진짜 뜨면 안되는 에러이지만 혹시 몰라서 둠.
      // SDK 는 public index.html 선에서 import이므로 무조건 되어야 정상.
      throw new Error('Kakao SDK Instance is not initialized');
    }
  } catch (error) {
    // 카운터 증가 후 로그인 재시도.
    setTimeout(() => {
      kakaoLogin(loginCount + 1, error.message);
    }, 1000);
  }
};
