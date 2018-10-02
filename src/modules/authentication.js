import firebaseApp from 'firebase';
import firebase from '../config/Firebase';
// Module for Authentication
// Use Ducks Structure
// 1. Type
// 2. Reducer
// 3. Actions

const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
// const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

const initialState = {
  userData: {
    email: null,
    isD: false,
    isRegister: false,
    name: null,
    uid: null
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, userData: payload };

    default:
      return state;
  }
};

export const googleLogin = () => async dispatch => {
  const provider = new firebaseApp.auth.GoogleAuthProvider();

  try {
    await firebase.auth().signInWithPopup(provider);
    const currentUser = firebase.auth().currentUser;
    const { name, uid, email } = currentUser;
    const userData = { name, age: null, uid, email, isD: true };

    await firebase
      .database()
      .ref('users/' + uid)
      .set(userData);

    // dispatch({ type: LOGIN_SUCCESS, payload: userData });
  } catch (error) {
    console.log(error);
    // dispatch({ type: LOGIN_FAIL });
  }
};

export const login = userData => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, payload: userData });
};
