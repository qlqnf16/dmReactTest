import * as actionTypes from './actions';

const initialState = {
  userData: {
    email: null,
    isD: false,
    isRegiser: false,
    name: null,
    uid: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        userData: action.userData
      };

    default:
      return state;
  }
};

export default reducer;
