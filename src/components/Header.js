import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BiWallet } from 'react-icons/bi';
import { GiCash } from 'react-icons/gi';
import { logout } from '../redux/actions';

class Header extends Component {
  state = {
    redirect: false,
  };

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

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }

    const { userEmail, expenses } = this.props;
    return (
      <div className="">
        <div className="flex space-b align-s">
          <div className="flex gap align-c pad-b">
            <BiWallet size={ 70 } style={ { fill: 'gold' } } />
            <h1 className="highlight">MyWallet</h1>
          </div>
          <button
            type="button"
            onClick={ this.handleLogout }
            className="btn-logout"
          >
            Logout
          </button>
        </div>
        <div className="flex-column gap">
          <div className="flex gap">
            <p className="highlight" data-testid="email-field">
              usuário:
              {' '}
              {userEmail}
            </p>
          </div>
          <div className="flex txt-gap bold">
            <GiCash style={ { fill: 'gold' } } />
            <p className="highlight" data-testid="total-field">
              {this.getAverageExpenseValue(expenses).toFixed(2)}
            </p>
            <p className="highlight" data-testid="header-currency-field">BRL</p>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
