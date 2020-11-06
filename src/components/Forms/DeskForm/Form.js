import React, { Fragment, useState, useRef, useEffect } from "react";
import "./Form.scss";

import Draggable from "../../Draggable/Draggable";
// import Button from '../Button/Button';

const FormContent = (props) => {
  return (
    <Fragment>
      <div
        className="form-header"
        style={{
          height: `${props.resizing && "100%"}`,
        }}
      >
        {props.header}
      </div>
      <div
        className="form-body"
        style={{
          height: `${props.resizing && "100%"}`,
        }}
      >
        <div className="form-inline">
          <input type="text" />
          <input type="text" />
        </div>
        {props.body}
      </div>
      <div
        className="form-footer"
        style={{
          height: `${props.resizing && "100%"}`,
        }}
      >
        {props.footer}
      </div>
    </Fragment>
  );
};

const Form = (props) => {
  const formRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [resizing, setResizing] = useState(false);

  const onStartResize = (resizing) => {
    setResizing(resizing);
  };

  useEffect(() => {
    const { width, height } = formRef.current.getBoundingClientRect();
    setWidth(width);
    setHeight(height);
  }, [height, width]);

  if (props.draggable) {
    return props.resizable ? (
      <Draggable
        resizable
        isResizing={onStartResize}
        width={props.width ? props.width : width}
        height={props.height ? props.height : height}
        top={props.top}
        left={props.left}
        minWidth={props.minWidth ? props.minWidth : width ? width : 480}
        minHeight={props.minWidth ? props.minHeight : height ? height : 480}
        outRef={formRef}
      >
        <form
          ref={formRef}
          style={{ height: `${resizing && "100%"}` }}
          className={`form ${props.className}`}
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
        >
          <FormContent {...props} resizing={resizing} />
        </form>
      </Draggable>
    ) : (
      <Draggable
        width={props.width ? props.width : width}
        height={props.height ? props.height : height}
        top={props.top}
        left={props.left}
        outRef={formRef}
      >
        <form
          ref={formRef}
          className={`form ${props.className}`}
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
        >
          <FormContent {...props} />
        </form>
      </Draggable>
    );
  }

  return (
    <form
      className={`basic-form ${props.className}`}
      onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      ref={formRef}
    >
      <FormContent {...props} />
    </form>
  );
};

export default Form;
