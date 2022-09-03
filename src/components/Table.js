import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';

import propTypes from 'prop-types';
import { deleteExpenseAction, editExpenseAction } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  };

  handleEdit = (id) => {
    const { editExpense, editor } = this.props;
    if (!editor) {
      editExpense(id);
    }
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="flex justify-center">
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
              expenses.map((exp) => {
                const { description, tag, method, value, currency, exchangeRates } = exp;
                const { ask, name } = exchangeRates[currency];
                const convertedValue = (Number(value) * Number(ask)).toFixed(2);
                return (
                  <tr key={ exp.id }>
                    <td><p>{description}</p></td>
                    <td><p>{tag}</p></td>
                    <td><p>{method}</p></td>
                    <td><p>{Number(value).toFixed(2)}</p></td>
                    <td><p>{name}</p></td>
                    <td><p>{Number(ask).toFixed(2)}</p></td>
                    <td><p>{convertedValue}</p></td>
                    <td>Real</td>
                    <td>
                      <button
                        className="btn-icon"
                        type="button"
                        name="edit"
                        text="Editar"
                        data-testid="edit-btn"
                        onClick={ () => this.handleEdit(exp.id) }
                      >
                        <BiEdit style={ { fontSize: '35px' } } />
                      </button>
                      <button
                        className="btn-icon"
                        type="button"
                        name="delete"
                        text="Excluir"
                        data-testid="delete-btn"
                        onClick={ () => this.deleteExpense(exp.id) }
                      >
                        <BsTrash style={ { fill: '#ff0000', fontSize: '35px' } } />
                      </button>
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
  editor: store.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
  editExpense: (id) => dispatch(editExpenseAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
