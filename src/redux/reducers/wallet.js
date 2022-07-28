import { REQUEST_FINANCIAL_DATA } from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_FINANCIAL_DATA:
    return {
      ...state,
      currencies: Object.keys(action.value)
        .filter((curr) => curr !== 'USDT'),
    };
  default:
    return state;
  }
}

export default walletReducer;
