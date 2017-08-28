import React from 'react';

import LoginForm from 'containers/LoginForm';
import RegistrationForm from 'containers/RegistrationForm';

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
