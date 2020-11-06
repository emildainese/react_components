import React from 'react';

const PlaybackAnimation = (props) => {
  return (
    <div
      className={props.classes.PlaybackAnimation}
      id="playback-animation"
      ref={props.playbackAnimationRef}
    >
      <svg className="playback-icons">
        <use
          className={props.classes.Hidden}
          href="#play-icon"
          ref={props.playRef}
        ></use>
        <use href="#pause" ref={props.pauseRef}></use>
      </svg>
    </div>
  );
};

export default PlaybackAnimation;
