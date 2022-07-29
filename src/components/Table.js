import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Button from './Button';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {
              expenses.map((exp, index) => {
                const { description, tag, method, value, currency, exchangeRates } = exp;
                const { ask } = exchangeRates[currency];
                const convertedValue = (Number(value) * Number(ask)).toFixed(2);
                const moedaDeConversao = 'Real Brasileiro';
                return (
                  <tr key={ index }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{value}</td>
                    <td>{currency}</td>
                    <td>{ask}</td>
                    <td>{convertedValue}</td>
                    <td>{moedaDeConversao}</td>
                    <td>
                      <Button name="edit" text="Editar" />
                      <Button name="delete" text="Excluir" />
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

export default connect(mapStateToProps)(Table);
