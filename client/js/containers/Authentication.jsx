import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  bindStateDeep,
  stateToProps,
  apiCall,
} from '../utilities';

import {
  loginRequest,
  registrationRequest,
} from '../actions/authentication';

import LabeledInput from '../components/LabeledInput';

// Quick and dirty email regex
const emailRegex = /^[^@]+@[^.]{2,}\..{2,}$/;

class Authentication extends Component {
  state = {
    login: {
      email: '',
      password: '',
    },

    registration: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
    },

    checkingEmailAvailability: false,
    emailAvailable: true,
  }

  debounceTimeout = null

  bind = bindStateDeep(this)

  checkEmailAvailability = async () => {
    const { email } = this.state.registration;

    if (!email.match(emailRegex)) {
      return;
    }

    const emailAvailable = await apiCall('emailAvailable', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }).then(res => res.json());

    this.setState({
      emailAvailable,
      checkingEmailAvailability: false,
    });
  }

  handleRegistrationEmailChange = (evt) => {
    this.setState({
      registration: Object.assign(this.state.registration, { email: evt.target.value }),
      checkingEmailAvailability: true,
      emailAvailable: true,
    });

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    this.debounceTimeout = setTimeout(this.checkEmailAvailability, 250);
  }

  handleLoginRequest = (evt) => {
    evt.preventDefault();

    const { email, password } = this.state.login;

    this.props.loginRequest(email, password);
  }

  handleRegistrationRequest = (evt) => {
    evt.preventDefault();

    const { email, firstName, lastName, password } = this.state.registration;

    this.props.registrationRequest(email, firstName, lastName, password);
  }

  render() {
    const {
      bind,
      handleLoginRequest,
      handleRegistrationRequest,
      handleRegistrationEmailChange,
    } = this;

    const {
      login,
      registration,
      emailAvailable,
      checkingEmailAvailability,
    } = this.state;

    const {
      authentication,
    } = this.props;

    const { isAuthenticating } = authentication;

    const loginButtonDisabled = !(
      login.email.match(emailRegex)
      && login.password.length >= 8
    ) || isAuthenticating;

    // Registration field validations
    const isEmailValid = registration.email.match(emailRegex);
    const isFirstNameValid = !!registration.firstName.length;
    const isLastNameValid = !!registration.lastName.length;
    const isPasswordValid = registration.password.length >= 8;
    const isPasswordRepeatValid = isPasswordValid && registration.password === registration.passwordRepeat;

    const signupButtonDisabled = !(
      isEmailValid
      && emailAvailable
      && isFirstNameValid
      && isLastNameValid
      && isPasswordValid
      && isPasswordRepeatValid
    ) || checkingEmailAvailability
      || isAuthenticating;

    const emailError = isEmailValid ? (emailAvailable ? '' : 'email is already in use!') : 'enter a valid email';

    const passwordError = isPasswordValid ? '' : 'password is too short!';

    return (
      <div className="authentication panel">
        <div className="brand">basic-chat</div>
        <form className="login" method="post" onSubmit={handleLoginRequest}>
          <h2>login</h2>
          <div className="form-group">
            <label htmlFor="login-email">email</label>
            <input
              id="login-email"
              type="email"
              placeholder="email@example.com"
              disabled={isAuthenticating}
              {...bind('login', 'email')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-passwd">password</label>
            <input
              id="login-email"
              type="password"
              placeholder="************"
              disabled={isAuthenticating}
              {...bind('login', 'password')}
            />
          </div>
          <input
            type="submit"
            value="log me in!"
            disabled={loginButtonDisabled || isAuthenticating}
          />
        </form>
        <form className="registration" method="post" onSubmit={handleRegistrationRequest}>
          <h2>registration</h2>
          <LabeledInput
            id="reg-email"
            label="email"
            type="email"
            valid={!emailError && !checkingEmailAvailability}
            error={emailError}
            placeholder="email@example.com"
            disabled={isAuthenticating}
            onChange={handleRegistrationEmailChange}
            value={registration.email}
          />
          <LabeledInput
            id="reg-fname"
            label="first name"
            type="text"
            valid={isFirstNameValid}
            placeholder="John"
            disabled={isAuthenticating}
            {...bind('registration', 'firstName')}
          />
          <LabeledInput
            id="reg-lname"
            label="last name"
            type="text"
            valid={isLastNameValid}
            placeholder="Smith"
            disabled={isAuthenticating}
            {...bind('registration', 'lastName')}
          />
          <LabeledInput
            id="reg-passwd"
            label="password"
            type="password"
            valid={isPasswordValid}
            error={passwordError}
            placeholder="************"
            disabled={isAuthenticating}
            {...bind('registration', 'password')}
          />
          <LabeledInput
            id="reg-passwd-repeat"
            label="password (again)"
            type="password"
            valid={isPasswordRepeatValid}
            error={isPasswordValid && !isPasswordRepeatValid ? 'no match!' : ''}
            placeholder="************"
            disabled={isAuthenticating}
            {...bind('registration', 'passwordRepeat')}
          />
          <input
            type="submit"
            value="sign me up!"
            disabled={signupButtonDisabled}
          />
          <span className="hint">all fields are required.</span>
        </form>
        <div className="clearfix" />
      </div>
    );
  }
}

export default connect(stateToProps('authentication'), {
  loginRequest,
  registrationRequest,
})(Authentication);
