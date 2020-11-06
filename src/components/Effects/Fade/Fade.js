import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './Fade.scss';

//Child component must have initial opacity 0
const Fade = (props) => {
  return (
    <CSSTransition
      in={props.in}
      timeout={props.timeout ? props.timeout : 300}
      classNames="fade"
    >
      {props.children ? props.children : <Test />}
    </CSSTransition>
  );
};

Fade.propTypes = {
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number,
};

export default Fade;

const Test = (props) => {
  return <div className="test">Fade in Test</div>;
};
