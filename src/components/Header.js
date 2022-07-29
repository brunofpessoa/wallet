import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

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
    }, 0)).toFixed(2);
  };

  render() {
    const { userEmail, expenses } = this.props;
    return (
      <div>
        <h1>Trybewallet</h1>
        <div>
          <p data-testid="email-field">{userEmail}</p>
          <p data-testid="total-field">
            {this.getAverageExpenseValue(expenses)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
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
