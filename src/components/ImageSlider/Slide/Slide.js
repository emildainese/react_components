import React from 'react';
import classes from './Slide.module.scss';

const Slide = (props) => {
  return (
    <div
      className={classes.Slide}
      style={{
        width: `${props.width}px`,
        backgroundImage: `url(${props.content})`,
      }}
    ></div>
  );
};

export default Slide;
