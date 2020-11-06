import React, { useState, useEffect, useRef } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import classes from './RangeSlider.module.scss';
import { useDraggable } from '../../hooks/draggable';

const RangeSlider = (props) => {
  const [value, setValue] = useState(0);
  const [width, setWidth] = useState(0);

  const cursorRef = useRef();
  const rangeRef = useRef();

  useEffect(() => {
    setWidth(rangeRef.current.getBoundingClientRect().width);
  }, []);

  const { startDrag, position } = useDraggable(
    props,
    cursorRef,
    null,
    0,
    width,
    true
  );

  const { onChange } = props;
  useEffect(() => {
    let currentValue = ((position.x0 / width) * 100).toFixed(0);
    setValue(currentValue);
    onChange(currentValue);
  }, [position.x0, width, onChange]);

  return (
    <div className={classes.RangeSlider}>
      {props.showMin && (
        <span className={classes.Min}>Min: {props.min ? props.min : 0}</span>
      )}
      <span className={classes.Slider} ref={rangeRef}>
        <span
          className={classes.Cursor}
          ref={cursorRef}
          onMouseDown={startDrag}
          style={{ left: `${position.x0}px` }}
        >
          <span className={classes.Thumb}></span>
          <Tooltip
            position="top"
            round
            label={value.toString()}
            style={{ zIndex: 4 }}
          ></Tooltip>
        </span>
      </span>
      {props.showMax && (
        <span className={classes.Max}>Max: {props.max ? props.max : 100}</span>
      )}
    </div>
  );
};

export default RangeSlider;

const tooltipStyle = {
  position: 'absolute',
  left: '50%',
  top: '0',
  transform: 'translate(-50%, -50%)',
  height: '5rem',
  width: '1rem',
  margin: 0,
  //backgroundColor: 'rgba(0,0,0, 0.5)',
};
