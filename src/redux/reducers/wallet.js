import { REQUEST_CURRENCIES, SAVE_EXPENSE,
  DELETE_EXPENSE, ENABLE_EDIT, SAVE_EDITED_EXPENSE, LOGOUT } from '../actions';
import { currencies, expenses } from './initialState';

const initialState = {
  currencies,
  expenses,
  editor: false,
  idToEdit: 0,
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(action.value)
        .filter((curr) => curr !== 'USDT'),
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.value),
    };
  case ENABLE_EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.value,
    };
  case SAVE_EDITED_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((exp) => {
        if (exp.id === action.payload.id) {
          return ({ ...action.payload.data });
        }
        return exp;
      }),
      editor: false,
    };
  case LOGOUT:
    return {
      ...state,
      currencies: [],
      expenses: [],
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
}

export default walletReducer;
