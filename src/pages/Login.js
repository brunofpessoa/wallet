import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Input from '../components/Input';
import Button from '../components/Button';
import loginAction from '../redux/actions';

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
      <>
        <Input
          name="email"
          type="email"
          placeholder="henry@newman.com"
          testId="email-input"
          label="EMAIL ADDRESS"
          onChange={ this.validateInputs }
        />
        <Input
          name="password"
          type="password"
          placeholder="Your password"
          testId="password-input"
          label="PASSWORD"
          onChange={ this.validateInputs }
        />
        <Button
          name="loginBtn"
          text="Entrar"
          disabled={ !(emailIsValid && passwordIsValid) }
          onClick={ this.login }
        />
      </>
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
