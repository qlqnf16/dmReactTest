// import firebaseApp from 'firebase';
// import firebase from '../config/Firebase';
import io from 'socket.io-client';
// Module for Authentication
// Use Ducks Structure
// 1. Type
// 2. Reducer
// 3. Actions

const LOGIN_SUCCESS = 'authentication/LOGIN_SUCCESS';
const GET_USER_ID = 'authentication/GET_USER_ID';
const UPDATE_REDUX = 'authentication/UPDATE_REDUX';
const CONNECT_SOCKET = 'socket';
// const LOGIN_FAIL = 'authentication/LOGIN_FAIL';

const initialState = {
  userData: {
    email: null,
    isD: false,
    isRegister: false,
    name: null,
    uid: null,
    phoneNumber: null,
    birthday: null
  },
  userId: null,
  socket: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...state, userData: payload };
    case GET_USER_ID:
      return { ...state, userId: payload };
    case UPDATE_REDUX:
      const name = payload.name;
      const updateData = payload.updateData;
      return { ...state, userData: { ...state.userData, [name]: updateData } };
    case CONNECT_SOCKET:
      const socket = io('http://52.78.187.58:3030');
      return { ...state, socket };
    default:
      return state;
  }
};

export const login = userData => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, payload: userData });
};
export const getUserId = _id => dispatch => {
  dispatch({ type: GET_USER_ID, payload: _id });
};
export const updateRedux = (name, updateData) => dispatch => {
  dispatch({ type: UPDATE_REDUX, payload: { name, updateData } });
};
export const connectSocket = () => dispatch => {
  dispatch({ type: CONNECT_SOCKET });
};
