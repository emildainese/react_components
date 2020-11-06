import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDraggable } from '../../hooks/draggable';
import './Draggable.scss';

const Draggable = (props) => {
  const divRef = useRef(null);
  const resizerRef = useRef(null);

  const {
    startDrag,
    startResize,
    position,
    elemWidth,
    elemHeight,
  } = useDraggable(props, divRef, resizerRef);

  return (
    <div
      className="draggable"
      ref={divRef}
      onMouseDown={startDrag}
      style={{
        left: `${position.x0 ? position.x0 : props.left}px`,
        top: `${position.y0 ? position.y0 : props.top}px`,
        width: `${elemWidth}px`,
        height: `${elemHeight}px`,
        ...props.style,
      }}
    >
      {props.resizable && (
        <div
          className="resizer"
          onMouseDown={startResize}
          ref={resizerRef}
        ></div>
      )}
      {props.children}
    </div>
  );
};

Draggable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  minWidth: PropTypes.number,
  minHeight: PropTypes.number,
  resizable: PropTypes.bool,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  isResizing: PropTypes.func,
  outRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  style: PropTypes.object,
};

export default Draggable;
