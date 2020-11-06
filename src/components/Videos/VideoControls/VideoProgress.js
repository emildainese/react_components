import React from 'react';

const VideoProgress = (props) => {
  return (
    <div className={props.classes.VideoProgress}>
      <progress
        value={props.progressBarValue}
        min={0}
        ref={props.progressBarRef}
        onChange={props.setProgressBarValue}
      ></progress>
      <input
        className={props.classes.Seek}
        id="seek"
        value={props.seekValue}
        min={0}
        type="range"
        step={1}
        onChange={props.setSeekValue}
        ref={props.seekRef}
      />
      <div
        className={props.classes.SeekTooltip}
        id="seek-tooltip"
        ref={props.seekTooltipRef}
      >
        00:00
      </div>
    </div>
  );
};

export default VideoProgress;
