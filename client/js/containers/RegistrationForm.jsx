import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import {
  bindState,
  stateToProps,
  apiCall,
} from 'utilities';

import {
  registrationRequest,
} from 'actions/authentication';

import LabeledInput from 'components/LabeledInput';
import Icon from 'components/Icon';

// Quick and dirty email regex
const emailRegex = /^[^@]+@[^.]{2,}\..{2,}$/;

class RegistrationForm extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    checkingEmailAvailability: false,
    emailAvailable: true,
  }

  debounceTimeout = null

  bind = bindState(this)

  checkEmailAvailability = async () => {
    const { email } = this.state;

    const emailAvailable = await apiCall('emailAvailable', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }).then(res => res.json());

    this.setState({
      emailAvailable,
      checkingEmailAvailability: false,
    });
  }

  handleEmailChange = (evt) => {
    this.setState({
      email: evt.target.value,
      emailAvailable: true,
    });

    if (!evt.target.value.match(emailRegex)) {
      return;
    }

    this.setState({
      checkingEmailAvailability: true,
    });

    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(this.checkEmailAvailability, 250);
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    const { email, firstName, lastName, password } = this.state;

    this.props.registrationRequest(email, firstName, lastName, password);
  }

  render() {
    const {
      bind,
      handleSubmit,
      handleEmailChange,
    } = this;

    const {
      email,
      firstName,
      lastName,
      password,
      emailAvailable,
      checkingEmailAvailability,
    } = this.state;

    const { isAuthenticating } = this.props.authentication;

    // Registration field validations
    const isEmailValid = !!email.match(emailRegex);
    const isFirstNameValid = !!firstName.length;
    const isLastNameValid = !!lastName.length;
    const isPasswordValid = password.length >= 8;

    const signupButtonDisabled = !(
      isEmailValid
      && emailAvailable
      && isFirstNameValid
      && isLastNameValid
      && isPasswordValid
    ) || checkingEmailAvailability
      || isAuthenticating;

    const validIcon = <Icon name="&#xE86C;" />;
    const errorIcon = <Icon name="&#xE5C9;" />;

    // Basic boolean tuple checking, default to no hint at all if
    // the email availability is currently being checked
    const emailHint = checkingEmailAvailability || R.cond([
      [R.equals([true, false]), R.always(<span>{errorIcon} email is already taken!</span>)],
      [R.equals([true, true]), R.always(validIcon)],
      [R.T, R.always(<span>{errorIcon} enter a valid email!</span>)],
    ])([isEmailValid, emailAvailable]);

    const emailHintType = R.all(R.identity)([isEmailValid, emailAvailable])
      ? 'success' : 'error';

    const firstNameHint = isFirstNameValid && validIcon;
    const lastNameHint = isLastNameValid && validIcon;

    const passwordHint = isPasswordValid
      ? validIcon
      : <span>{errorIcon} password is too short!</span>;

    const passwordHintType = isPasswordValid ? 'success' : 'error';

    return (
      <form className="registration" method="post" onSubmit={handleSubmit}>
        <h2>registration</h2>
        <LabeledInput
          id="reg-email"
          label="email"
          type="email"
          hint={emailHint}
          hintType={emailHintType}
          placeholder="email@example.com"
          disabled={isAuthenticating}
          onChange={handleEmailChange}
          value={email}
        />
        <LabeledInput
          id="reg-fname"
          label="first name"
          type="text"
          hint={firstNameHint}
          hintType="success"
          placeholder="John"
          disabled={isAuthenticating}
          {...bind('firstName')}
        />
        <LabeledInput
          id="reg-lname"
          label="last name"
          type="text"
          hint={lastNameHint}
          hintType="success"
          placeholder="Smith"
          disabled={isAuthenticating}
          {...bind('lastName')}
        />
        <LabeledInput
          id="reg-passwd"
          label="password"
          type="password"
          hint={passwordHint}
          hintType={passwordHintType}
          placeholder="************"
          disabled={isAuthenticating}
          {...bind('password')}
        />
        <input
          type="submit"
          value="sign me up!"
          disabled={signupButtonDisabled}
        />
        <span className="hint">all fields are required.</span>
      </form>
    );
  }
}

export default connect(stateToProps('authentication'), {
  registrationRequest,
})(RegistrationForm);
