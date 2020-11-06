import React, { Fragment } from 'react';

const PassworInput = (props) => {
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="password"
        name={props.name}
        placeholder={props.label}
        required
        disabled={props.disabled ? props.disabled : false}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </Fragment>
  );
};

export default PassworInput;
