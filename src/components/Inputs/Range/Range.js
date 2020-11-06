import React, { useState, useEffect, useRef } from 'react';
import classes from './Range.module.scss';

const Range = (props) => {
  const [right, setRight] = useState(75);
  const [left, setLeft] = useState(25);
  const inputLeftRef = useRef(null);
  const inputRightRef = useRef(null);
  const thumbLeftRef = useRef(null);
  const thumbRightRef = useRef(null);
  const rangeRef = useRef(null);

  const setLeftValue = () => {
    const inputLeft = inputLeftRef.current;
    const inputRight = inputRightRef.current;
    const thumbLeft = thumbLeftRef.current;
    const range = rangeRef.current;
    let min = parseInt(inputLeft.min);
    let max = parseInt(inputLeft.max);
    inputLeft.value = Math.min(
      parseInt(inputLeft.value),
      parseInt(inputRight.value) - 1
    );
    const percent = parseInt(((inputLeft.value - min) / (max - min)) * 100);
    setLeft(percent);
    thumbLeft.style.left = `${percent}%`;
    range.style.left = `${percent}%`;
  };

  const setRightValue = () => {
    const inputLeft = inputLeftRef.current;
    const inputRight = inputRightRef.current;
    const thumbRight = thumbRightRef.current;
    const range = rangeRef.current;
    let min = parseInt(inputRight.min);
    let max = parseInt(inputRight.max);
    inputRight.value = Math.max(
      parseInt(inputRight.value),
      parseInt(inputLeft.value) + 1
    );
    const percent = parseInt(((inputRight.value - min) / (max - min)) * 100);
    setRight(percent);
    thumbRight.style.right = `${100 - percent}%`;
    range.style.right = `${100 - percent}%`;
  };

  useEffect(() => {
    thumbLeftRef.current.setAttribute('value', left);
    thumbRightRef.current.setAttribute('value', right);
  }, [left, right]);

  useEffect(() => {
    setLeftValue();
    setRightValue();
  }, []);

  return (
    <div className={classes.InputFieldControl}>
      <div className={classes.MultiRangeSlider}>
        <input
          ref={inputLeftRef}
          type="range"
          min={props.min ? props.min : 0}
          max={props.max ? props.max : 100}
          value={left}
          onChange={() => setLeftValue()}
          onMouseOver={() => {
            thumbLeftRef.current.classList.add(classes.Hover);
            thumbLeftRef.current.classList.add(classes.ActivateMarker);
          }}
          onMouseOut={() => {
            thumbLeftRef.current.classList.remove(classes.Hover);
            thumbLeftRef.current.classList.remove(classes.ActivateMarker);
          }}
          onMouseDown={() => thumbLeftRef.current.classList.add(classes.Active)}
          onMouseUp={() =>
            thumbLeftRef.current.classList.remove(classes.Active)
          }
        ></input>
        <input
          ref={inputRightRef}
          type="range"
          min={props.min ? props.min : 0}
          max={props.max ? props.max : 100}
          value={right}
          onChange={() => setRightValue()}
          onMouseOver={() => {
            thumbRightRef.current.classList.add(classes.Hover);
            thumbRightRef.current.classList.add(classes.ActivateMarker);
          }}
          onMouseOut={() => {
            thumbRightRef.current.classList.remove(classes.Hover);
            thumbRightRef.current.classList.remove(classes.ActivateMarker);
          }}
          onMouseDown={() =>
            thumbRightRef.current.classList.add(classes.Active)
          }
          onMouseUp={() =>
            thumbRightRef.current.classList.remove(classes.Active)
          }
        ></input>
        <div className={classes.Slider}>
          <div className={classes.Track}></div>
          <div className={classes.Range} ref={rangeRef}></div>
          <div
            className={`${classes.Thumb} ${classes.Left} ${classes.MarkerTop}`}
            ref={thumbLeftRef}
          ></div>
          <div
            className={`${classes.Thumb} ${classes.Right} ${classes.MarkerTop}`}
            ref={thumbRightRef}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Range;
