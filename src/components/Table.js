import React, { Component } from 'react';
import { connect } from 'react-redux';

import propTypes from 'prop-types';
import Button from './Button';
import { deleteExpenseAction } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((exp, index) => {
                const { description, tag, method, value, currency, exchangeRates } = exp;
                const { ask, name } = exchangeRates[currency];
                const convertedValue = (Number(value) * Number(ask)).toFixed(2);
                return (
                  <tr key={ index }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{Number(value).toFixed(2)}</td>
                    <td>{name}</td>
                    <td>{Number(ask).toFixed(2)}</td>
                    <td>{convertedValue}</td>
                    <td>Real</td>
                    <td>
                      <Button name="edit" text="Editar" />
                      <Button
                        name="delete"
                        text="Excluir"
                        testId="delete-btn"
                        onClick={ () => this.deleteExpense(exp.id) }
                      />
                    </td>
                  </tr>);
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  description: propTypes.string,
  tag: propTypes.string,
  method: propTypes.string,
  value: propTypes.string,
  currency: propTypes.string,
  exchangeRates: propTypes.arrayOf(propTypes.object),
  ask: propTypes.string,
}.isRequired;

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
