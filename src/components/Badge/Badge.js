import React from 'react';
import PropTypes from 'prop-types';
import classes from './Badge.module.scss';

const Badge = (props) => {
  return (
    <span
      className={classes.Badge}
      style={{
        backgroundColor: `${props.backgroundColor}`,
        color: `${props.color}`,
      }}
    >
      {props.content}
    </span>
  );
};

Badge.propTypes = {
  content: PropTypes.string.isRequired,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default Badge;
