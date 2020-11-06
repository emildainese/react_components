import React, { Fragment } from 'react';
import classes from './Marker.module.scss';

//Top e Left Calcolate e passate via props
const Marker = (props) => {
  return (
    <Fragment>
      <div
        className={classes.Pin}
        style={{
          top: `${props.top ? props.top : '50%'}`,
          left: `${props.left ? props.left : '50%'}`,
        }}
      ></div>
      <div
        className={classes.Pulse}
        style={{
          top: `${props.top ? props.top : '50%'}`,
          left: `${props.left ? props.left : '50%'}`,
        }}
      ></div>
    </Fragment>
  );
};

export default Marker;
