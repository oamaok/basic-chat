import React from 'react';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

export default function Authentication() {
  return (
    <div className="authentication panel">
      <div className="brand">basic-chat</div>
      <LoginForm />
      <RegistrationForm />
      <div className="clearfix" />
    </div>
  );
}
