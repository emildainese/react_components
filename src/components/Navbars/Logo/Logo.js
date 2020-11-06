import React from 'react';
import classes from './Logo.module.scss';

const Logo = (props) => {
  return <div className={classes.Logo}>{props.logo}</div>;
};

export default Logo;
