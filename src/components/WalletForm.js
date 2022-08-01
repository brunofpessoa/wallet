import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Input from './Input';
import Select from './Select';
import Button from './Button';
import { expenseAction, fetchCurrenciesData } from '../redux/actions';
import getFinancialData from '../services/economyAPI';

const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const expenseTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde',
];

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: [],
    };
  }

  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  submitExpense = async ({ target }) => {
    const financialData = await getFinancialData();
    this.setState({ exchangeRates: financialData }, this.saveExpense);
    target.parentNode.reset();
  }

  saveExpense = () => {
    const { value, currency, method, tag, description, exchangeRates } = this.state;
    const { expenses, addExpense } = this.props;
    const data = {
      id: expenses.length < 1 ? 0 : expenses[expenses.length - 1].id + 1,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    addExpense(data);
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <Input
            name="value"
            type="number"
            label="Despesa"
            placeholder="Valor"
            testId="value-input"
            onChange={ this.handleChange }
          />
          <Input
            name="description"
            label="Descrição"
            placeholder="Digite aqui."
            testId="description-input"
            onChange={ this.handleChange }
          />
          <Select
            name="currency"
            testid="currency-input"
            label="Moeda"
            options={ currencies }
            onChange={ this.handleChange }
          />
          <Select
            name="method"
            testid="method-input"
            label="Pagamento"
            options={ methodOptions }
            onChange={ this.handleChange }
          />
          <Select
            name="tag"
            testid="tag-input"
            label="Categoria"
            options={ expenseTag }
            onChange={ this.handleChange }
          />
          <Button
            name="addExpense"
            text="Adicionar despesa"
            onClick={ this.submitExpense }
          />
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
  addExpense: propTypes.func.isRequired,
  fetchCurrencies: propTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (data) => dispatch(expenseAction(data)),
  fetchCurrencies: () => dispatch(fetchCurrenciesData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
