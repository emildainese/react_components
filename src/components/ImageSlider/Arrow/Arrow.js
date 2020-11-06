import React from 'react';
import classes from './Arrow.module.scss';
import leftArrow from '../img/left-arrow.svg';
import rightArrow from '../img/right-arrow.svg';

const Arrow = (props) => {
  return (
    <div
      onClick={props.handleClick}
      className={classes.Arrow}
      style={{
        right: `${props.direction === 'right' ? '25px' : ''}`,
        left: `${props.direction === 'left' ? '25px' : ''}`,
      }}
    >
      {props.direction === 'right' ? (
        <img
          src={rightArrow}
          alt="rightArrow"
          style={{
            transform: `translateX(${
              props.direction === 'left' ? '-2px' : '2px'
            })`,
          }}
        />
      ) : (
        <img
          src={leftArrow}
          alt="leftArrow"
          style={{
            transform: `translateX(${
              props.direction === 'left' ? '-2px' : '2px'
            })`,
          }}
        />
      )}
    </div>
  );
};

export default Arrow;
