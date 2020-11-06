import React from 'react';
import './Backdrop.scss';

const Backdrop = (props) => {
  return (
    <div
      className={`backdrop ${props.show ? 'backdrop-open' : 'backdrop-close'}`}
      onClick={props.closeModal}
    ></div>
  );
};

export default Backdrop;
