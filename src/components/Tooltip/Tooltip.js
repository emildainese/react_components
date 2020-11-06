import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classes from './Tooltip.module.scss';

const Tooltip = (props) => {
  const tooltipRef = useRef();

  const position =
    props.position.charAt(0).toUpperCase() + props.position.slice(1);

  useEffect(() => {
    tooltipRef.current.setAttribute('title', props.label);
  }, [props.label]);

  return (
    <div
      className={`${props.marker ? classes.Marker : classes.Tooltip} ${
        props.position ? classes[`${position}`] : ''
      }`}
      ref={tooltipRef}
      style={{ ...props.style }}
    >
      {props.children}
    </div>
  );
};

Tooltip.propTypes = {
  position: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default Tooltip;
