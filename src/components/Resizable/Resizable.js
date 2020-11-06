import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Resizable.scss';

const Resizable = (props) => {
  const minElementSize = props.minSize ? props.minSize : null;
  const { topLeft, topRight, bottomLeft, bottomRight } = props;
  let config = getResizerConfig(props);

  const divRef = useRef(null);
  const topLeftResizer = useRef(null);
  const topRightResizer = useRef(null);
  const bottomLeftResizer = useRef(null);
  const bottomRightResizer = useRef(null);

  const [resizing, setResizing] = useState(false);
  const [position, setMousePosition] = useState({ x: 0.0, y: 0.0 });
  const [elemWidth, setWidth] = useState(props.width ? props.width : 0);
  const [elemHeight, setHeight] = useState(props.height ? props.height : 0);
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);

  const startResize = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(true);
    setMousePosition({ x: e.pageX, y: e.pageY });
    setTop(divRef.current.getBoundingClientRect().top);
    setLeft(divRef.current.getBoundingClientRect().left);
  };

  const stopResize = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(false);
  };

  const resizeElement = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!resizing) return;

      setMousePosition({ x: e.pageX, y: e.pageY });
      let resizer = e.target.closest('div');

      if (
        bottomRightResizer.current &&
        bottomRightResizer.current === resizer
      ) {
        if (elemWidth > minElementSize && elemHeight > minElementSize) {
          if (bottomRight && bottomRight.both) {
            setWidth(elemWidth + (e.pageX - position.x));
            setHeight(elemHeight + (e.pageY - position.y));
          } else if (bottomRight && bottomRight.horizontal) {
            setWidth(elemWidth + (e.pageX - position.x));
          } else {
            setHeight(elemHeight + (e.pageY - position.y));
          }
        }
      } else if (
        bottomLeftResizer.current &&
        bottomLeftResizer.current === resizer
      ) {
        if (elemWidth > minElementSize && elemHeight > minElementSize) {
          if (bottomLeft && bottomLeft.both) {
            setWidth(elemWidth - (e.pageX - position.x));
            setHeight(elemHeight + (e.pageY - position.y));
            setLeft(left + (e.pageX - position.x));
          } else if (bottomLeft && bottomLeft.horizontal) {
            setWidth(elemWidth - (e.pageX - position.x));
            setLeft(left + (e.pageX - position.x));
          } else {
            setHeight(elemHeight + (e.pageY - position.y));
          }
        }
      } else if (
        topRightResizer.current &&
        topRightResizer.current === resizer
      ) {
        if (elemWidth > minElementSize && elemHeight > minElementSize) {
          if (topRight && topRight.both) {
            setWidth(elemWidth + (e.pageX - position.x));
            setHeight(elemHeight - (e.pageY - position.y));
            setTop(top + (e.pageY - position.y));
          } else if (topRight && topRight.horizontal) {
            setWidth(elemWidth + (e.pageX - position.x));
          } else {
            setHeight(elemHeight - (e.pageY - position.y));
            setTop(top + (e.pageY - position.y));
          }
        }
      } else if (topLeftResizer.current && topLeftResizer.current === resizer) {
        if (elemWidth > minElementSize && elemHeight > minElementSize) {
          if (topLeft && topLeft.both) {
            setWidth(elemWidth - (e.pageX - position.x));
            setHeight(elemHeight - (e.pageY - position.y));
            setLeft(left + (e.pageX - position.x));
            setTop(top + (e.pageY - position.y));
          } else if (topLeft && topLeft.horizontal) {
            setWidth(elemWidth - (e.pageX - position.x));
            setLeft(left + (e.pageX - position.x));
          } else {
            setHeight(elemHeight - (e.pageY - position.y));
            setTop(top + (e.pageY - position.y));
          }
        }
      }
    },
    [
      resizing,
      position,
      minElementSize,
      elemHeight,
      elemWidth,
      left,
      top,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    ],
  );

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', resizeElement);
      window.addEventListener('mouseup', stopResize);
    }
    return () => {
      window.removeEventListener('mousemove', resizeElement);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [resizing, resizeElement]);

  let resizers = config.map((resizer, idx) => {
    switch (resizer.type) {
      case 'top-left':
        return (
          <div
            key={idx}
            className="top-left"
            ref={topLeftResizer}
            onMouseDown={startResize}
            style={{
              cursor: `${
                topLeft.both
                  ? 'nw-resize'
                  : topLeft.horizontal
                  ? 'e-resize'
                  : 'n-resize'
              }`,
            }}
          ></div>
        );
      case 'top-right':
        return (
          <div
            key={idx}
            id="top-right"
            className="top-right"
            ref={topRightResizer}
            onMouseDown={startResize}
            style={{
              cursor: `${
                topRight.both
                  ? 'sw-resize'
                  : topRight.horizontal
                  ? 'e-resize'
                  : 'n-resize'
              }`,
            }}
          ></div>
        );
      case 'bottom-left':
        return (
          <div
            key={idx}
            className="bottom-left"
            ref={bottomLeftResizer}
            onMouseDown={startResize}
            style={{
              cursor: `${
                bottomLeft.both
                  ? 'sw-resize'
                  : bottomLeft.horizontal
                  ? 'e-resize'
                  : 'n-resize'
              }`,
            }}
          ></div>
        );
      case 'bottom-right':
        return (
          <div
            key={idx}
            id="bottom-right"
            className="bottom-right"
            ref={bottomRightResizer}
            onMouseDown={startResize}
            style={{
              cursor: `${
                bottomRight.both
                  ? 'nw-resize'
                  : bottomRight.horizontal
                  ? 'e-resize'
                  : 'n-resize'
              }`,
            }}
          ></div>
        );
      default:
        throw new Error('Invalid Resizer Type');
    }
  });

  let resizableElement = props.custom ? (
    <div
      className="resizable"
      ref={divRef}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${elemWidth}px`,
        height: `${elemHeight}px`,
      }}
    >
      {resizers}
      {props.children}
    </div>
  ) : (
    <div
      className="resizable"
      style={{
        resize: `${
          props.both
            ? 'both'
            : props.vertical
            ? 'vertical'
            : props.horizontal
            ? 'horizontal'
            : 'both'
        } `,
      }}
    >
      {props.children}
    </div>
  );

  return resizableElement;
};

Resizable.propsType = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  custom: PropTypes.bool,
  topLeft: PropTypes.object,
  topRight: PropTypes.object,
  bottomLeft: PropTypes.object,
  bottomRight: PropTypes.object,
};

export default Resizable;

const getResizerConfig = (props) => {
  let config = [];
  if (props.topLeft) {
    let resizer = {};
    resizer.type = 'top-left';
    config.push(resizer);
  }
  if (props.topRight) {
    let resizer = {};
    resizer.type = 'top-right';
    config.push(resizer);
  }
  if (props.bottomLeft) {
    let resizer = {};
    resizer.type = 'bottom-left';
    config.push(resizer);
  }
  if (props.bottomRight) {
    let resizer = {};
    resizer.type = 'bottom-right';
    config.push(resizer);
  }
  return config;
};
