import getFinancialData from '../../services/economyAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_FINANCIAL_DATA = 'REQUEST_FINANCIAL_DATA';

export const loginAction = (value) => (
  {
    type: LOGIN, value,
  });

const walletAction = (data) => (
  { type: REQUEST_FINANCIAL_DATA,
    value: data,
  });

export function fetchFinancialData() {
  return async (dispatch) => {
    const response = await getFinancialData();
    dispatch(walletAction(response));
  };
}
