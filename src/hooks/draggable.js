import { useState, useEffect, useCallback } from 'react';

//1) Separare drag da resize creare due hook specifici per dargX e dragY
//2) Aggiungere gli effetti dello scroll di pagina in X e Y
//3) Migliorare la gestione dei valori minimi e massimi delle posizioni in X e Y
export const useDraggable = (
  props,
  divRef,
  resizerRef,
  minX = null,
  maxX = null,
  onWindow = null,
) => {
  const { isResizing, minWidth, minHeight } = props;

  const minWidthFallback = 100;
  const minHeightFallback = 100;

  //Control Drag
  const [drag, setDrag] = useState(false);
  const [relativePosition, setRelativePosition] = useState({ x: 0.0, y: 0.0 });
  const [position, setPosition] = useState({
    x0: props.left ? props.left : 0,
    y0: props.top ? props.top : 0,
  });

  //Control Resize
  const [resize, setResize] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.0, y: 0.0 });
  const [minElementWidth, setMinElementWidth] = useState(minWidth);
  const [minElementHeight, setMinElementHeight] = useState(minHeight);
  const [elemWidth, setWidth] = useState(props.width);
  const [elemHeight, setHeight] = useState(props.height);

  useEffect(() => {
    if (!minElementHeight) setMinElementHeight(minWidthFallback);
    if (!minElementWidth) setMinElementWidth(minHeightFallback);
  }, [minElementWidth, minElementHeight]);

  useEffect(() => {
    if (props.outRef) {
      const { width, height } = props.outRef.current.getBoundingClientRect();
      setWidth(width);
      setHeight(height);
    } else return;
  }, [props.outRef]);

  const startDrag = useCallback(
    (e) => {
      if (
        e.target.nodeName !== 'INPUT' &&
        e.target.nodeName !== 'BUTTON' &&
        !e.target.classList.contains('ripple-container') &&
        !e.target.classList.contains('ripple')
      ) {
        setDrag(true);
        setResize(false);
        const leftPos = divRef.current.offsetLeft;
        const topPos = divRef.current.offsetTop;
        setRelativePosition({
          x: e.pageX - leftPos,
          y: e.pageY - topPos,
        });
      } else {
        setDrag(false);
        return;
      }
      e.stopPropagation();
      e.preventDefault();
    },
    [divRef],
  );

  const stopDrag = useCallback((e) => {
    setDrag(false);
    setResize(false);
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const dragElement = useCallback(
    (e) => {
      if (!drag) return;

      let xPos = e.pageX - relativePosition.x;
      let yPos = e.pageY - relativePosition.y;

      if (minX || maxX) {
        if (xPos <= maxX && xPos >= minX) {
          setPosition({
            x0: xPos,
            y0: yPos,
          });
        } else if (xPos < minX) {
          setPosition({ x0: minX, y0: yPos });
        } else if (xPos > minX) {
          setPosition({ x0: maxX, y0: yPos });
        }
      } else {
        setPosition({
          x0: xPos,
          y0: yPos,
        });
      }

      e.stopPropagation();
      e.preventDefault();
    },
    [drag, relativePosition, minX, maxX],
  );

  const startResize = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setResize(true);
      if (props.outRef) {
        isResizing(true);
      }
      setDrag(false);
      setMousePosition({ x: e.pageX, y: e.pageY });
    },
    [isResizing, props.outRef],
  );

  const stopResize = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      setResize(false);
      if (props.outRef) {
        isResizing(false);
      }
    },
    [isResizing, props.outRef],
  );

  const handleElementSize = useCallback(
    (e, elemWidth, minElementWidth, elemHeight, minElementHeight) => {
      if (elemWidth >= minElementWidth) {
        setWidth((prevWidth) => prevWidth + (e.pageX - mousePosition.x));
      } else {
        setWidth(minElementWidth);
      }
      if (elemHeight >= minElementHeight) {
        setHeight((prevHeight) => prevHeight + (e.pageY - mousePosition.y));
      } else {
        setHeight(minElementHeight);
      }
    },
    [mousePosition],
  );

  const resizeElement = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!resize) return;
      if (e.target === resizerRef.current) {
        setResize(true);
        setDrag(false);
        setMousePosition({ x: e.pageX, y: e.pageY });
        if (props.outRef) {
          handleElementSize(
            e,
            elemWidth,
            minElementWidth,
            elemHeight,
            minElementHeight,
          );
        } else {
          handleElementSize(
            e,
            elemWidth,
            minElementWidth,
            elemHeight,
            minElementHeight,
          );
        }
      }
    },
    [
      resizerRef,
      props.outRef,
      resize,
      elemWidth,
      elemHeight,
      minElementWidth,
      minElementHeight,
      handleElementSize,
    ],
  );

  //Control Resize
  useEffect(() => {
    if (resize) {
      window.addEventListener('mousemove', resizeElement);
      window.addEventListener('mouseup', stopResize);
      window.addEventListener('mousleave', stopResize);
    }
    return () => {
      window.removeEventListener('mousemove', resizeElement);
      window.removeEventListener('mouseup', stopResize);
      window.removeEventListener('mouseleave', stopResize);
    };
  }, [resize, resizeElement, stopResize]);

  //Control Drag
  useEffect(() => {
    const current = divRef.current;
    if (onWindow && drag) {
      window.addEventListener('mousemove', dragElement);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('mouseleave', stopDrag);
    } else {
      if (drag) {
        current.addEventListener('mousemove', dragElement);
        current.addEventListener('mouseup', stopDrag);
        current.addEventListener('mouseleave', stopDrag);
      }
    }

    return () => {
      if (onWindow) {
        window.removeEventListener('mousemove', dragElement);
        window.removeEventListener('mouseup', stopDrag);
        window.removeEventListener('mouseleave', stopDrag);
      } else {
        current.removeEventListener('mousemove', dragElement);
        current.removeEventListener('mouseup', stopDrag);
        current.removeEventListener('mouseleave', stopDrag);
      }
    };
  }, [drag, dragElement, stopDrag, divRef, onWindow]);

  return {
    position,
    startDrag,
    startResize,
    elemWidth,
    elemHeight,
  };
};

export const useResizer = (props, resizerRef) => {};
