import React from 'react';
import PropTypes from 'prop-types';
import FilledInput from './Input/FilledInput';
import OutlinedInput from './Input/OutlinedInput';
import BasicInput from './Input/BasicInput';

const TextInput = (props) => {
  switch (props.type) {
    case 'filled':
      return (
        <FilledInput
          onChange={props.onChange}
          label={props.label}
          fillColor={props.fillColor}
          labelStyle={props.labelStyle}
        />
      );
    case 'outlined':
      return (
        <OutlinedInput
          onChange={props.onChange}
          label={props.label}
          labelStyle={props.labelStyle}
        />
      );
    case undefined:
      return (
        <BasicInput
          onChange={props.onChange}
          label={props.label}
          labelStyle={props.labelStyle}
        />
      );
    default:
      throw new Error('Invalid Text Input Type');
  }
};

TextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  fillColor: PropTypes.string,
  labelStyle: PropTypes.object,
};

export default TextInput;
