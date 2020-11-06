import React from 'react';
import classes from './SliderContent.module.scss';

const SliderContent = (props) => {
  return (
    <div
      className={classes.SliderContent}
      style={{
        transform: `translateX(-${props.translate}px)`,
        transition: `transform ease-out ${props.transition}s`,
        width: `${props.width}px`,
      }}
    >
      {props.children}
    </div>
  );
};

export default SliderContent;
