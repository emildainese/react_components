import React from 'react';
import classes from './Dots.module.scss';

const Dot = (props) => {
  return (
    <span
      className={classes.Dot}
      style={{ background: `${props.active ? 'black' : 'white'}` }}
    ></span>
  );
};

const Dots = (props) => {
  return (
    <div className={classes.Dots}>
      {props.slides.map((slide, i) => (
        <Dot key={slide} active={props.activeSlide === i} />
      ))}
    </div>
  );
};

export default Dots;
