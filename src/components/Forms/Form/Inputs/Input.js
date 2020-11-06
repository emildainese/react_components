import React from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

const Input = (props) => {
  switch (props.type) {
    case 'text':
      return (
        <TextInput
          label={props.label}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.disabled ? props.disabled : false}
        />
      );
    case 'email':
      return (
        <EmailInput
          label={props.label}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.disabled ? props.disabled : false}
        />
      );
    case 'password':
      return (
        <PasswordInput
          label={props.label}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          disabled={props.disabled ? props.disabled : false}
        />
      );
    default:
      throw new Error('Invalid Input Type');
  }
};

export default Input;
