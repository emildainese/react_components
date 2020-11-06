import React, { Fragment } from 'react';

const EmailInput = (props) => {
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="email"
        name={props.name}
        placeholder={props.label}
        required
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </Fragment>
  );
};

export default EmailInput;
