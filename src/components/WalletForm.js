import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Input from './Input';
import Select from './Select';

const methodOptions = [
  { text: 'Dinheiro', value: 'cash' },
  { text: 'Cartão de crédito', value: 'credit' },
  { text: 'Cartão de débito', value: 'debit' },
];
const tag = [
  { text: 'Alimentação', value: 'food' },
  { text: 'Lazer', value: 'leisure' },
  { text: 'Trabalho', value: 'job' },
  { text: 'Transporte', value: 'transport' },
  { text: 'Saúde', value: 'health' },
];

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <Input
            name="expense"
            type="number"
            label="Despesa"
            placeholder="Valor"
            testId="value-input"
          />
          <Input
            name="description"
            label="Descrição"
            placeholder="Digite aqui."
            testId="description-input"
          />
          <Select
            name="currency"
            testid="currency-input"
            label="Moeda"
            options={ currencies.map((curr) => ({ text: curr, value: curr })) }
          />
          <Select
            name="method"
            testid="method-input"
            label="Pagamento"
            options={ methodOptions }
          />
          <Select
            name="tag"
            testid="tag-input"
            label="Categoria"
            options={ tag }
          />
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
