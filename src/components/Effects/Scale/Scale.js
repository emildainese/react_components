import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Scale.scss';

const Scale = (props) => {
  return (
    <CSSTransition
      in={props.in}
      timeout={props.timeout ? props.timeout : 300}
      classNames="scale"
    >
      {props.children ? props.children : <Test />}
    </CSSTransition>
  );
};

Scale.propsType = {
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number,
};

export default Scale;

const Test = (props) => {
  return <div className="test">Scale in Test</div>;
};
