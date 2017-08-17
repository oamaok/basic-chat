import React, { Component } from 'react';

class Authentication extends Component {
  render() {
    return (
      <div className="authentication panel">
        <div className="brand">basic-chat</div>
        <form className="login">
          <h2>login</h2>
          <div className="form-group">
            <label htmlFor="login-email">email</label>
            <input id="login-email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="login-passwd">password</label>
            <input id="login-email" type="text" />
          </div>
          <input type="submit" value="log me in!" />
        </form>
        <form className="registration">
          <h2>registration</h2>
          <div className="form-group">
            <label htmlFor="reg-email">email</label>
            <input id="reg-email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="reg-fname">first name</label>
            <input id="reg-fname" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="reg-lname">last name</label>
            <input id="reg-lname" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="reg-passwd">password</label>
            <input id="reg-passwd" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="reg-passwd-repeat">password (again)</label>
            <input id="reg-passwd-repeat" type="text" />
          </div>
          <input type="submit" value="sign me up!" />
        </form>
        <div className="clearfix" />
      </div>
    );
  }
}

export default Authentication;
