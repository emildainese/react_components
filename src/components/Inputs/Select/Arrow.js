import React from 'react';
import classes from './Arrow.module.scss';

const Arrow = (props) => {
  return (
    <div
      className={`${classes.Arrow} ${props.active ? classes.Active : ''}`}
      style={{
        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 -5 25 25' fill='${props.color}'%3E%3Cpath d='M7 10l5 5 5-5z'%3E%3C/path%3E%3C/svg%3E") no-repeat`,
      }}
    ></div>
  );
};

export default Arrow;
