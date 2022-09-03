import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { BiWallet } from 'react-icons/bi';
import { loginAction } from '../redux/actions';
// import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailIsValid: false,
      passwordIsValid: false,
      email: '',
    };
  }

  validateInputs = ({ target }) => {
    const { name, value } = target;

    const passwordMinLength = 6;
    if (name === 'password') {
      this.setState({
        passwordIsValid: value.length >= passwordMinLength,
      });
    }

    if (name === 'email') {
      const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      this.setState({
        emailIsValid: value.match(emailRegex),
        email: value,
      });
    }
  }

  login = () => {
    const { email } = this.state;
    const { makeLogin, history } = this.props;
    makeLogin(email);
    history.push('/carteira');
  }

  render() {
    const { emailIsValid, passwordIsValid } = this.state;
    return (
      <form className="flex-column absolute-center shadow">
        <div className="flex gap align-c primary pad">
          <BiWallet
            style={ { fill: 'gold',
              fontSize: 'var(--fs-xl)' } }
          />
          <h1 className="highlight">MyWallet</h1>
        </div>
        <div className="flex-column gap align-c pad">
          <label className="flex-column" htmlFor="email">
            Email
            <input
              name="email"
              type="email"
              placeholder="user@email.com"
              data-testid="email-input"
              onChange={ this.validateInputs }
            />
          </label>
          <label className="flex-column" htmlFor="password">
            Password
            <input
              name="password"
              type="password"
              placeholder="Your password"
              data-testid="password-input"
              onChange={ this.validateInputs }
            />
          </label>
          <button
            className="highlight"
            type="submit"
            name="loginBtn"
            disabled={ !(emailIsValid && passwordIsValid) }
            onClick={ this.login }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  makeLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  makeLogin: propTypes.func.isRequired,
  history: propTypes.objectOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
