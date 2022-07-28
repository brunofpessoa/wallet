import { combineReducers } from 'redux';

import loginReducer from './user';
import walletReducer from './wallet';

const reducer = combineReducers({
  user: loginReducer,
  wallet: walletReducer,
});

export default reducer;
