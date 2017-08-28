import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import {
  bindState,
  stateToProps,
} from 'utilities';

import {
  loginRequest,
} from 'actions/authentication';

import LabeledInput from 'components/LabeledInput';

// Quick and dirty email regex
const emailRegex = /^[^@]+@[^.]{2,}\..{2,}$/;

class Authentication extends Component {
  state = {
    email: '',
    password: '',
  }

  bind = bindState(this)

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = this.state;

    this.props.loginRequest(email, password);
  }

  render() {
    const {
      bind,
      handleSubmit,
    } = this;

    const {
      email,
      password,
    } = this.state;

    const { isAuthenticating, loginStatus } = this.props.authentication;

    const loginButtonDisabled = !(
      email.match(emailRegex)
      && password.length >= 8
    ) || isAuthenticating;

    const errorMessage = R.cond([
      [R.equals(0), R.always('')],
      [R.equals(200), R.always('')],
      [R.equals(401), R.always('Invalid credentials.')],
      [R.T, R.always('Whoops, something unexpected went wrong!')],
    ])(loginStatus);

    return (
      <form className="login" method="post" onSubmit={handleSubmit}>
        <h2>login</h2>
        <LabeledInput
          id="login-email"
          type="email"
          label="email"
          placeholder="email@example.com"
          disabled={isAuthenticating}
          {...bind('email')}
        />
        <LabeledInput
          id="login-email"
          type="password"
          label="password"
          placeholder="************"
          disabled={isAuthenticating}
          {...bind('password')}
        />
        <input
          type="submit"
          value="log me in!"
          disabled={loginButtonDisabled || isAuthenticating}
        />
        {errorMessage && <div className="error">{errorMessage}</div>}
      </form>
    );
  }
}

export default connect(stateToProps('authentication'), {
  loginRequest,
})(Authentication);
