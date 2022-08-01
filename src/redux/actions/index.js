import getFinancialData from '../../services/economyAPI';

export const LOGIN = 'LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const ENABLE_EDIT = 'ENABLE_EDIT';
export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

export const loginAction = (value) => ({
  type: LOGIN, value,
});

const currenciesAction = (data) => ({
  type: REQUEST_CURRENCIES,
  value: data,
});

export const deleteExpenseAction = (id) => ({
  type: DELETE_EXPENSE,
  value: id,
});

export const editExpenseAction = (id) => ({
  type: ENABLE_EDIT,
  value: id,
});

export const saveEditedExpenseAction = (id, data) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: {
    id,
    data,
  },
});

export function fetchCurrenciesData() {
  return async (dispatch) => {
    const response = await getFinancialData();
    dispatch(currenciesAction(response));
  };
}

export const expenseAction = (data) => ({
  type: SAVE_EXPENSE, value: data,
});
