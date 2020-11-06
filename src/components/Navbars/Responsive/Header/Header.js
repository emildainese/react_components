import React from 'react';
import classes from './Header.module.scss';

const Header = (props) => {
  return (
    <header
      className={classes.Header}
      style={{
        height: `${props.height ? props.height : 3.5}rem`,
        ...mediaQuery(props),
      }}
    >
      {props.children}
    </header>
  );
};

export default Header;

const mediaQuery = (props) => {
  if (props.width < props.breakPoint) {
    return {
      padding: '0 2rem',
    };
  }
  return;
};
