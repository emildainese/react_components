import React from 'react';

const TimeControls = (props) => {
  return (
    <div className={props.classes.Time}>
      <time id="time-elapsed" ref={props.timeElapsedRef}>
        00:00
      </time>
      <span> / </span>
      <time id="duration" ref={props.durationRef}>
        00:00
      </time>
    </div>
  );
};

export default TimeControls;
