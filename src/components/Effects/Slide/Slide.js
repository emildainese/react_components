import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Slide.scss';

const Slide = (props) => {
  return (
    <CSSTransition
      in={props.in}
      timeout={props.timeout ? props.timeout : 300}
      classNames="slide"
      mountOnEnter
    >
      {props.children ? props.children : <Test />}
    </CSSTransition>
  );
};

Slide.propsType = {
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number,
};

export default Slide;

const Test = (props) => {
  return <div className="test">Slide in Test</div>;
};
