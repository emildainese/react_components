import React from 'react';

const VolumeControls = (props) => {
  return (
    <div className={props.classes.VolumeControls}>
      <button
        data-title="Mute (m)"
        className={props.classes.VolumeButton}
        id="volume-button"
        ref={props.volumeButtonRef}
        onClick={props.toggleMute}
      >
        <svg ref={props.volumeIconsRef}>
          <use
            className={props.classes.Hidden}
            href="#volume-mute"
            ref={props.volumeMuteRef}
          ></use>
          <use
            className={props.classes.Hidden}
            href="#volume-low"
            ref={props.volumeLowRef}
          ></use>
          <use href="#volume-high" ref={props.volumeHighRef}></use>
        </svg>
      </button>
      <input
        className={props.classes.Volume}
        onChange={props.updateVolume}
        id="volume"
        value={props.volume}
        data-mute="0.5"
        type="range"
        max={1}
        min={0}
        step={0.01}
      />
    </div>
  );
};

export default VolumeControls;
