import getFinancialData from '../../services/economyAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const loginAction = (value) => (
  {
    type: LOGIN, value,
  });

const currenciesAction = (data) => (
  { type: REQUEST_CURRENCIES,
    value: data,
  });

export function fetchCurrenciesData() {
  return async (dispatch) => {
    const response = await getFinancialData();
    dispatch(currenciesAction(response));
  };
}

export const expenseAction = (data) => (
  {
    type: SAVE_EXPENSE, value: data,
  });
