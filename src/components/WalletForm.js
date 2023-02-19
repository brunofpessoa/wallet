import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { GrFormAdd } from 'react-icons/gr';

import Select from './Select';
import { expenseAction, fetchCurrenciesData,
  saveEditedExpenseAction } from '../redux/actions';
import getFinancialData from '../services/economyAPI';

const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const expenseTag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde',
];

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  exchangeRates: [],
  isEditing: false,
};

class WalletForm extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  componentDidMount = () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'value') {
      if (!Number.isNaN(value) && Number(value) >= 0) {
        this.setState({ [name]: value });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  submitExpense = async () => {
    const financialData = await getFinancialData();
    this.setState({
      exchangeRates: financialData,
    }, () => { this.saveExpense(); this.cleanState(); });
  }

  cleanState = () => {
    this.setState(INITIAL_STATE);
  }

  saveExpense = () => {
    const { value, currency, method, tag, description, exchangeRates } = this.state;
    const { expenses, addExpense } = this.props;
    const lastPos = -1;
    const data = {
      id: expenses.length < 1 ? 0 : expenses.at(lastPos).id + 1,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    addExpense(data);
  }

  componentDidUpdate = () => {
    this.restoreDataToEdit();
  };

  restoreDataToEdit = () => {
    const { editor } = this.props;
    const { isEditing } = this.state;

    if (editor && !isEditing) {
      const { idToEdit, expenses } = this.props;
      const expenseToEdit = expenses.find((exp) => exp.id === idToEdit);
      const { value, currency, method, tag, description } = expenseToEdit;
      this.setState({
        value,
        currency,
        method,
        tag,
        description,
        isEditing: true,
      });
    }
  };

  submitEditedExpense = async () => {
    const financialData = await getFinancialData();
    this.setState({
      exchangeRates: financialData,
    }, () => { this.handleEdit(); this.cleanState(); });
  }

  isButtonDisabled = () => {
    const {
      value,
      currency,
      method,
      tag,
    } = this.state;

    return !value || !currency || !method || !tag;
  }

  handleEdit = () => {
    const { value, currency, method, tag, description, exchangeRates } = this.state;
    const { idToEdit, saveEditedExpense } = this.props;
    const data = {
      id: idToEdit,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    saveEditedExpense(idToEdit, data);
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form className="flex align-c gap">
          <label htmlFor="Value" className="flex-column">
            <span>
              Valor
              <span className="red">*</span>
            </span>
            <input
              name="value"
              type="number"
              label="Valor"
              placeholder="Ex: 10,50"
              data-testid="value-input"
              onChange={ this.handleChange }
              min="0"
              value={ value }
            />
          </label>
          <label htmlFor="description" className="flex-column">
            Descrição
            <input
              name="description"
              label="Descrição"
              placeholder="Digite aqui"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <Select
            name="currency"
            testid="currency-input"
            label="Moeda"
            options={ currencies }
            onChange={ this.handleChange }
            value={ currency }
          />
          <Select
            name="method"
            testid="method-input"
            label="Pagamento"
            options={ methodOptions }
            onChange={ this.handleChange }
            value={ method }
          />
          <Select
            name="tag"
            testid="tag-input"
            label="Categoria"
            options={ expenseTag }
            onChange={ this.handleChange }
            value={ tag }
          />
          {
            editor
              ? (
                <button
                  className="round flex align-c"
                  type="button"
                  name="editExpense"
                  text="Editar despesa"
                  onClick={ this.submitEditedExpense }
                  disabled={ this.isButtonDisabled() }
                >
                  <MdPlaylistAddCheck style={ { fill: 'white' } } />
                </button>)
              : (
                <button
                  className="round flex align-c"
                  type="button"
                  name="addExpense"
                  text="Adicionar despesa"
                  onClick={ this.submitExpense }
                  disabled={ this.isButtonDisabled() }
                  style={ { backgroundColor: 'var(--theme)' } }

                >
                  <GrFormAdd style={ { fill: 'white' } } />
                </button>)
          }
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  addExpense: PropTypes.func.isRequired,
  saveEditedExpense: PropTypes.func.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editor: store.wallet.editor,
  idToEdit: store.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (data) => dispatch(expenseAction(data)),
  fetchCurrencies: () => dispatch(fetchCurrenciesData()),
  saveEditedExpense: (id, data) => dispatch(saveEditedExpenseAction(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
