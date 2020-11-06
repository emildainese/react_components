import React, { useState } from 'react';
import classes from './Layout.module.scss';

const Layout = (props) => {
  return <div classes={classes.Fluid}>{props.children}</div>;
};

export default Layout;
