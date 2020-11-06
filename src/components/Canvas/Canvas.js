import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import "./Canvas.scss";

const url =
  "https://images.unsplash.com/photo-1531935015902-64b87c1f4da5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";

const Canvas = (props) => {
  const { width, height, imgUrl, imgWidth, imgHeight } = props;

  const canvasRef = useRef(null);
  const fileRef = useRef();

  const [image, setImage] = useState(null);
  const [startPan, setStartPan] = useState(false);
  const [originPosition, setOriginPosition] = useState({
    offset: { x: 0, y: 0 },
  });
  const [panPosition, setPanPosition] = useState({
    start: { x0: 0, y0: 0 },
    offset: { x: 0, y: 0 },
  });

  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStartPan(true);
    setPanPosition({ ...panPosition, start: { x0: e.clientX, y0: e.clientY } });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    setImage(image);
    image.src = imgUrl ? imgUrl : url;
    image.onload = () => {
      ctx.drawImage(
        image,
        canvas.width / 4,
        canvas.height / 4,
        imgWidth ? imgWidth : canvas.width / 2,
        imgHeight ? imgHeight : canvas.height / 2
      );
    };
  }, [imgUrl, imgHeight, imgWidth]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(panPosition.offset.x, panPosition.offset.y);
    ctx.drawImage(
      image,
      canvas.width / 4,
      canvas.height / 4,
      imgWidth ? imgWidth : canvas.width / 2,
      imgHeight ? imgHeight : canvas.height / 2
    );
  }, [panPosition, image, imgHeight, imgWidth]);

  const onMouseMove = useCallback(
    (e) => {
      if (!startPan) return;
      e.preventDefault();
      e.stopPropagation();
      const offsetX = e.clientX - panPosition.start.x0;
      const offsetY = e.clientY - panPosition.start.y0;
      console.log(
        "pan position: ",
        panPosition.start.x0,
        panPosition.start.y0,
        " mouse pos",
        e.clientX,
        e.clientY,
        " offsets ",
        offsetX,
        offsetY
      );
      setPanPosition({
        ...panPosition,
        offset: {
          x: originPosition.offset.x + offsetX,
          y: originPosition.offset.y + offsetY,
        },
      });
      draw();
    },
    [startPan, originPosition, panPosition, draw]
  );

  const onMouseUp = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setStartPan(false);
      setPanPosition({ ...panPosition, start: { x0: 0, y0: 0 } });
      setOriginPosition({
        offset: { x: panPosition.offset.x, y: panPosition.offset.y },
      });
    },
    [panPosition]
  );

  // const onMouseWheel = () => {};

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const loadImage = () => {
    const canvas = canvasRef.current;
    const file = fileRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    if (file && file.files.length === 1)
      image.src = URL.createObjectURL(file.files[0]);
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  };

  return (
    <div className="container" style={{ marginTop: "1rem" }}>
      {props.loadImage && (
        <input type="file" ref={fileRef} onChange={loadImage} />
      )}
      <canvas
        id="canvas"
        ref={canvasRef}
        width={width ? width : 500}
        height={height ? height : 500}
        onMouseDown={onMouseDown}
      ></canvas>
    </div>
  );
};

Canvas.propsType = {
  width: PropTypes.number,
  height: PropTypes.number,
  loadImage: PropTypes.bool,
  imgUrl: PropTypes.string,
  imgHeight: PropTypes.number,
  imgWidth: PropTypes.number,
};

export default Canvas;

//----------------------------------------------------------------------------------------------------------------------
// The CanvasRenderingContext2D.translate() method adds a translation transformation to the current matrix by moving the canvas and its origin x units horizontally and y units vertically on the grid.

//----------------------------------------------------------------------------------------------------------------------
// The CanvasRenderingContext2D.setTransform() method of the Canvas 2D API resets (overrides) the current transformation to the identity matrix, and then invokes a transformation described by the arguments of this method. This lets you scale, rotate, translate (move), and skew the context.
//                  a, b, c, d, e, f
// ctx.setTransform(1, 0, 0, 1, 0, 0);
/*[
  [a, c, e],
  [b, d, f],
  [0, 0, 1]
]*/

// a (m11)
// Horizontal scaling. A value of 1 results in no scaling.

// b (m12)
// Vertical skewing.

// c (m21)
// Horizontal skewing.

// d (m22)
// Vertical scaling. A value of 1 results in no scaling.

// e (dx)
// Horizontal translation (moving).

// f (dy)
// Vertical translation (moving).
