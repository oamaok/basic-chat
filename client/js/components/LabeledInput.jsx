import React from 'react';

import Icon from './Icon';

export default function LabeledInput({ id, label, valid, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {valid && <span className='hint success'><Icon name="&#xE86C;" /></span>}
        {error && <span className='hint error'><Icon name="&#xE5C9;" />&nbsp;{error}</span>}
      </label>
      <input
        id={id}
        {...rest}
      />
    </div>
  );
}
