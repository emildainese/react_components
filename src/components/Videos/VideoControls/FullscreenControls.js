import React from 'react';

const FullscreenControls = (props) => {
  return (
    <button
      data-title="Full screen (f)"
      className={props.classes.FullscreenButton}
      id="fullscreen-button"
      onClick={props.toggleFullScreen}
      ref={props.fullScreenButtonRef}
    >
      <svg ref={props.fullScreenIconsRef}>
        <use href="#fullscreen"></use>
        <use href="#fullscreen-exit" className={props.classes.Hidden}></use>
      </svg>
    </button>
  );
};

export default FullscreenControls;
