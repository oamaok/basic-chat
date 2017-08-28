import React from 'react';

export default function LabeledInput({ id, label, hint, hintType = '', ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>
        {label}
        {hint && <span className={`hint ${hintType}`}>{hint}</span>}
      </label>
      <input
        id={id}
        {...rest}
      />
    </div>
  );
}
