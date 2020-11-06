import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import "./Grow.scss";

const Grow = (props) => {
  return (
    <CSSTransition
      in={props.in}
      timeout={props.timeout ? props.timeout : 300}
      classNames="grow"
    >
      {props.children ? props.children : <Test />}
    </CSSTransition>
  );
};

Grow.propsType = {
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number,
};

export default Grow;

const Test = (props) => {
  return <div className="test">Scale in Test</div>;
};
