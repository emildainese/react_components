import React from 'react';

const PipControls = (props) => {
  return (
    <button
      data-title="PIP (p)"
      className={props.classes.PipButton}
      id="pip-button"
      ref={props.pipButtonRef}
      onClick={props.togglePip}
    >
      <svg>
        <use href="#pip"></use>
      </svg>
    </button>
  );
};

export default PipControls;
