import { REQUEST_CURRENCIES, SAVE_EXPENSE,
  DELETE_EXPENSE, ENABLE_EDIT, SAVE_EDITED_EXPENSE } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
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
  default:
    return state;
  }
}

export default walletReducer;
