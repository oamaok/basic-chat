import { apiCall } from '../utilities';

export function loginRequestFailure(error) {
  return {
    type: 'LOGIN_REQUEST_FAILURE',
    data: error,
  };
}

export function loginRequestSuccess(response) {
  return {
    type: 'LOGIN_REQUEST_SUCCESS',
    data: response,
  };
}

export function loginRequest(email, password) {
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    try {
      const response = await apiCall('login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status !== 200) {
        dispatch(loginRequestFailure(response.status));
        return;
      }

      const json = await response.json();

      dispatch(loginRequestSuccess(json));
    } catch (err) {
      dispatch(loginRequestFailure(500));
    }
  };
}

export function registrationRequestFailure(error) {
  return {
    type: 'REGISTRATION_REQUEST_FAILURE',
    data: error,
  };
}

export function registrationRequestSuccess(response) {
  return {
    type: 'REGISTRATION_REQUEST_SUCCESS',
    data: response,
  };
}

export function registrationRequest(email, firstName, lastName, password) {
  return async (dispatch) => {
    dispatch({
      type: 'REGISTRATION_REQUEST',
    });

    try {
      const response = await apiCall('register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
        }),
      });

      if (response.status !== 200) {
        dispatch(registrationRequestFailure(response.status));
        return;
      }

      const json = await response.json();

      dispatch(registrationRequestSuccess(json));
    } catch (err) {
      dispatch(registrationRequestFailure());
    }
  };
}

export function logout() {
  return {
    type: 'RESET_APP_STATE',
  };
}
