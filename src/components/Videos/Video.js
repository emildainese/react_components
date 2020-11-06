import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import VideoControls from './VideoControls/VideoControls';
import controlsClasses from './VideoControls/VideoControls.module.scss';
import classes from './Video.module.scss';
import poster from './image/poster.jpg';
import video from './video/video.mp4';
import { useVideo } from '../../hooks/video';
import PlaybackAnimation from './PlaybackAnimation';

// Improvement
// Add support for captions and subtitles.
// Add speed support.
// Add the ability to fast-forward or rewind the video.
// Add ability to choose video resolution (720p, 480p, 360p, 240p).

const Video = (props) => {
  const refs = {
    videoRef: useRef(null),
    videoControlsRef: useRef(null),
    videoContainerRef: useRef(null),
    playbackAnimationRef: useRef(null),
    playRef: useRef(null),
    pauseRef: useRef(null),
  };

  const { togglePlay, animatePlayback, hideControls, showControls } = useVideo(
    refs,
    classes,
    controlsClasses
  );

  const onClickHandler = () => {
    togglePlay();
    animatePlayback();
  };

  return (
    <div className={classes.VideoContainer} ref={refs.videoContainerRef}>
      <PlaybackAnimation
        classes={classes}
        playbackAnimationRef={refs.playbackAnimationRef}
        playRef={refs.playRef}
        pauseRef={refs.pauseRef}
      />
      <video
        controls
        ref={refs.videoRef}
        className={classes.Video}
        id="video"
        preload="metadata"
        poster={props.poster ? props.poster : poster}
        onClick={onClickHandler}
        onMouseEnter={showControls}
        onMouseLeave={hideControls}
      >
        <source src={props.src ? props.src : video} type="video/mp4"></source>
      </video>
      <VideoControls
        videoControlsRef={refs.videoControlsRef}
        videoContainerRef={refs.videoContainerRef}
        videoRef={refs.videoRef}
        togglePlay={togglePlay}
        hideControls={hideControls}
        showControls={showControls}
        animatePlayback={animatePlayback}
      />
    </div>
  );
};

Video.propTypes = {
  poster: PropTypes.string,
  video: PropTypes.string,
};

export default Video;
