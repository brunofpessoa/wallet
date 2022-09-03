import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { BiWallet } from 'react-icons/bi';

class Header extends Component {
  getAverageExpenseValue = (expenses) => {
    if (expenses.length < 1) {
      return 0;
    }
    return (expenses.reduce((acc, curr) => {
      const { value, currency, exchangeRates } = curr;
      const { ask } = exchangeRates[currency];
      const convertedValue = Number(value) * Number(ask);
      return acc + convertedValue;
    }, 0));
  };

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <div className="flex space-b pad">
        <div className="flex gap align-c">
          <BiWallet size={ 70 } />
          <h1>MyWallet</h1>
        </div>
        <div className="flex-column gap">
          <div className="flex txt-gap">
            <p className="bold">Usuário:</p>
            <p data-testid="email-field">{userEmail}</p>
          </div>
          <div className="flex txt-gap bold">
            <p>Total:</p>
            <p data-testid="total-field">
              {this.getAverageExpenseValue(expenses).toFixed(2)}
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
