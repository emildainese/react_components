import React, { useState, useRef, useEffect, Fragment } from 'react';
import classes from './ProgressBar.module.scss';

const ProgressBar = (props) => {
  const [progress, setProgress] = useState(0);
  const barRef = useRef();

  const advance = (timeStep) => {
    const elem = barRef.current;
    let i = 0;
    if (i === 0) {
      const frame = () => {
        if (width >= 100) {
          clearInterval(timer);
          i = 0;
        } else {
          width++;
          elem.style.width = `${width}%`;
          setProgress(width);
        }
      };
      i = 1;
      let width = 1;
      const timer = setInterval(frame, timeStep);
    }
  };

  useEffect(() => {
    advance(100);
  }, []);

  return (
    <Fragment>
      <div className={classes.ProgressBar}>
        <div className={classes.Bar} ref={barRef}>
          <span
            className={classes.Progress}
            style={{ transform: `transalteX(${progress}%)` }}
          >
            {progress}%
          </span>
          ;
        </div>
      </div>
    </Fragment>
  );
};

export default ProgressBar;
