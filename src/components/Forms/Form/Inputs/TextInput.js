import React, { Fragment } from 'react';

const TextInput = (props) => {
  return (
    <Fragment>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
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

export default TextInput;
