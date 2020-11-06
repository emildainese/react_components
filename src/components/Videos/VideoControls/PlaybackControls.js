import React from 'react';

const PlaybackControls = (props) => {
  return (
    <button
      data-title="Play (k)"
      onClick={props.togglePlay}
      ref={props.playButtonRef}
    >
      <svg className="playback-icons" ref={props.playbackIconsRef}>
        <use href="#play-icon"></use>
        <use className={props.classes.Hidden} href="#pause"></use>
      </svg>
    </button>
  );
};

export default PlaybackControls;
