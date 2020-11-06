import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';
import Ripple from './Ripple/Ripple';

const Button = (props) => {
  return (
    <button
      className={`btn ${props.className}`}
      onClick={props.onClick ? props.onClick : () => {}}
      style={props.style}
      type={props.type ? props.type : 'button'}
    >
      {props.ripple && <Ripple duration={props.duration} color={props.color} />}
      {props.children}
    </button>
  );
};

Button.propsTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  ripple: PropTypes.bool,
  duration: PropTypes.number,
  color: PropTypes.string,
};

export default Button;
