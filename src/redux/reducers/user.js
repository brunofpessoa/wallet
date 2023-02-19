import { LOGIN, LOGOUT } from '../actions';

const initialState = {
  email: 'fulano@email.com',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.value,
    };
  case LOGOUT:
    return {
      ...state,
      email: '',
    };
  default:
    return state;
  }
}

export default loginReducer;
