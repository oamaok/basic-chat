import R from 'ramda';

export function createReducer(initialState: any, reducers: any) {
  return (state = initialState, action) => {
    const reducer = reducers[action.type];
    return reducer ? reducer(state, action.data) : state;
  };
}

export function stateToProps(...args) {
  return state => R.pick(args, state);
}

export function bindState(thisBind) {
  return (function innerBind(key) {
    if (typeof key !== 'string') {
      throw new Error('bindState only supports a single key as a string: for more, use bindStateDeep');
    }

    return {
      value: this.state[key],
      onChange: evt => this.setState({ [key]: evt.target.value }),
    };
  }).bind(thisBind);
}

export function bindStateDeep(thisBind) {
  return (function innerBind(...path) {
    if (path.length < 2) {
      throw new Error('bindStateDeep needs a path with the length of at least two keys: use bindState instead for one key');
    }

    const lens = R.lensPath(path);
    const baseLens = R.lensProp(path[0]);
    const pathLens = R.lensPath(path.slice(1));

    const base = R.view(baseLens, this.state);
    return {
      value: R.view(lens, this.state),
      onChange: evt => this.setState({
        [path[0]]: R.set(pathLens, evt.target.value, base),
      }),
    };
  }).bind(thisBind);
}

export function apiCall(path, options = {}, token = '') {
  return fetch(`/api/${path}`, R.mergeAll([
    { method: 'GET' },
    options,
    {
      headers: {
        authorization: token,
        'content-type': 'application/json;charset=UTF-8',
      },
      credentials: 'include',
    },
  ]));
}
