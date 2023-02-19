import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BiWallet } from 'react-icons/bi';
import { loginAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailIsValid: false,
      passwordIsValid: false,
      email: '',
      emailBorderColor: '',
      passwordBorderColor: '',
    };
  }

  validateInputs = ({ target }) => {
    const { name, value } = target;

    const passwordMinLength = 6;
    if (name === 'password') {
      this.setState({
        passwordIsValid: value.length >= passwordMinLength,
      }, () => {
        const { passwordIsValid } = this.state;
        if (passwordIsValid) {
          this.setState({
            passwordBorderColor: 'border-theme',
          });
        } else {
          this.setState({
            passwordBorderColor: 'border-red',
          });
        }
      });
    }

    if (name === 'email') {
      const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      this.setState({
        emailIsValid: value.match(emailRegex),
        email: value,
      }, () => {
        const { emailIsValid } = this.state;
        if (emailIsValid) {
          this.setState({
            emailBorderColor: 'border-theme',
          });
        } else {
          this.setState({
            emailBorderColor: 'border-red',
          });
        }
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
    const {
      emailIsValid,
      passwordIsValid,
      emailBorderColor,
      passwordBorderColor,
    } = this.state;
    return (
      <form className="flex-column absolute-center card-shadow">
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
              className={ emailBorderColor }
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
              className={ passwordBorderColor }
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
  makeLogin: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
