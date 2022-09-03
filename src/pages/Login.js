import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Button from '../components/Button';
import { loginAction } from '../redux/actions';
import styles from '../styles/Login.module.css';

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
      <div className={ styles.main }>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            placeholder="henry@newman.com"
            data-testid="email-input"
            onChange={ this.validateInputs }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            type="password"
            placeholder="Your password"
            data-testid="password-input"
            onChange={ this.validateInputs }
          />
        </label>
        <Button
          name="loginBtn"
          text="Entrar"
          disabled={ !(emailIsValid && passwordIsValid) }
          onClick={ this.login }
        />
      </div>
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
