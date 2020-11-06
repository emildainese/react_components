import { useState, useEffect, useCallback } from 'react';
import classes from '../components/Videos/VideoControls/VideoControls.module.scss';

export const useVideoControls = (props, refs) => {
  const video = props.videoRef.current;

  const [seekValue, setSeekValue] = useState(0);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [volume, setVolume] = useState(1);

  const [volumeIcons, setVolumeIcons] = useState([]);
  const [playbackIcons, setPlaybackIcons] = useState([]);
  const [fullscreenIcons, setFullScreenIcons] = useState([]);
  const [volumeMute, setVolumeMute] = useState(null);
  const [volumeLow, setVolumeLow] = useState(null);
  const [volumeHigh, setVolumeHigh] = useState(null);
  const [volumeButton, setVolumeButton] = useState(null);
  const [playButton, setPlayButton] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(null);
  const [duration, setDuration] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [seek, setSeek] = useState(null);
  const [seekTooltip, setSeekTooltip] = useState(null);
  const [fullscreenButton, setFullScreenButton] = useState(null);
  const [pipButton, setPipButton] = useState(null);

  useEffect(() => {
    setPlaybackIcons(Array.from(refs['playbackIconsRef'].current.children));
    setPlayButton(refs['playButtonRef'].current);
    setTimeElapsed(refs['timeElapsedRef'].current);
    setDuration(refs['durationRef'].current);
    setProgressBar(refs['progressBarRef'].current);
    setSeek(refs['seekRef'].current);
    setSeekTooltip(refs['seekTooltipRef'].current);
    setVolumeIcons(Array.from(refs['volumeIconsRef'].current.children));
    setVolumeMute(refs['volumeMuteRef'].current);
    setVolumeLow(refs['volumeLowRef'].current);
    setVolumeHigh(refs['volumeHighRef'].current);
    setVolumeButton(refs['volumeButtonRef'].current);
    setFullScreenIcons(Array.from(refs['fullScreenIconsRef'].current.children));
    setFullScreenButton(refs['fullScreenButtonRef'].current);
    setPipButton(refs['pipButtonRef'].current);
    // eslint-disable-next-line
  }, [props.videoRef]);

  const initializeVideo = useCallback(() => {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    // eslint-disable-next-line
  }, [video]);

  const updateProgress = useCallback(() => {
    setSeekValue(Math.floor(video.currentTime));
    setProgressBarValue(Math.floor(video.currentTime));
    // eslint-disable-next-line
  }, [video]);

  const updateTimeElapsed = useCallback(() => {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`);
    // eslint-disable-next-line
  }, [video]);

  const updatePlayButton = useCallback(() => {
    playbackIcons.forEach((icon) => icon.classList.toggle(classes['Hidden']));
    if (video.paused) {
      playButton.setAttribute('data-title', 'Play (k)');
    } else {
      playButton.setAttribute('data-title', 'Pause (k)');
    }
    // eslint-disable-next-line
  }, [video]);

  const updateSeekTooltip = useCallback(
    (e) => {
      const skipTo = Math.round(
        (e.offsetX / e.target.clientWidth) *
          parseInt(e.target.getAttribute('max'), 10) //% da sinistra
      );
      seek.setAttribute('data-seek', skipTo);
      const time = formatTime(skipTo);
      seekTooltip.textContent = `${time.minutes}:${time.seconds}`;
      const rect = video.getBoundingClientRect();
      seekTooltip.style.left = `${e.pageX - rect.left}px`;
    },
    // eslint-disable-next-line
    [video]
  );

  const skipAhead = useCallback(
    (e) => {
      const video = props.videoRef.current;
      const skipTo = e.target.dataset.seek
        ? e.target.dataset.seek
        : e.target.value;
      video.currentTime = skipTo;
      setProgressBarValue(skipTo);
      setSeekValue(skipTo);
    },
    // eslint-disable-next-line
    []
  );

  const updateVolume = (e) => {
    if (video.muted) {
      video.muted = false;
    }
    setVolume(e.target.value);
    video.volume = volume;
  };

  const updateVolumeIcon = useCallback(() => {
    volumeIcons.forEach((icon) => {
      icon.classList.add(classes['Hidden']);
    });
    volumeButton.setAttribute('data-title', 'Mute (m)');
    if (video.muted || video.volume <= 0.01) {
      //0.01 is the volume step
      volumeMute.classList.remove(classes['Hidden']);
      volumeButton.setAttribute('data-title', 'Unmute (m)');
    } else if (video.volume > 0.01 && video.volume <= 0.5) {
      volumeLow.classList.remove(classes['Hidden']);
    } else if (video.volume > 0.5) {
      volumeHigh.classList.remove(classes['Hidden']);
    }
    // eslint-disable-next-line
  }, [video]);

  const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
      volumeButton.setAttribute('data-volume', volume);
      setVolume(0);
    } else {
      setVolume(volumeButton.dataset.volume);
    }
  };

  const updateFullscreenButton = useCallback(() => {
    fullscreenIcons.forEach((icon) => icon.classList.toggle(classes['Hidden']));
    if (document.fullscreenElement) {
      fullscreenButton.setAttribute('data-title', 'Exit full screen (f)');
    } else {
      fullscreenButton.setAttribute('data-title', 'Full screen (f)');
    }
  }, [fullscreenButton, fullscreenIcons]);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      props.videoContainerRef.current.requestFullscreen();
    }
  };

  // togglePip toggles Picture-in-Picture mode on the video
  const togglePip = async () => {
    try {
      if (video !== document.pictureInPictureElement) {
        pipButton.disabled = true;
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch (error) {
      console.error(error);
    } finally {
      pipButton.disabled = false;
    }
  };

  const keyboardShortcuts = useCallback(
    (e) => {
      const { key } = e;
      switch (key) {
        case 'k':
          props.togglePlay();
          props.animatePlayback();
          if (video.paused) {
            props.showControls();
          } else {
            setTimeout(() => {
              props.hideControls();
            }, 2000);
          }
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullScreen();
          break;
        case 'p':
          togglePip();
          break;
        default:
          return;
      }
    },
    // eslint-disable-next-line
    [video]
  );

  useEffect(() => {
    const video = props.videoRef.current;
    const seek = refs['seekRef'].current;
    video.addEventListener('play', updatePlayButton);
    video.addEventListener('pause', updatePlayButton);
    video.addEventListener('loadedmetadata', initializeVideo);
    video.addEventListener('timeupdate', updateTimeElapsed);
    video.addEventListener('timeupdate', updateProgress);
    seek.addEventListener('mousemove', updateSeekTooltip);
    seek.addEventListener('input', skipAhead);
    video.addEventListener('volumechange', updateVolumeIcon);
    props.videoContainerRef.current.addEventListener(
      'fullscreenchange',
      updateFullscreenButton
    );
    document.addEventListener('DOMContentLoaded', () => {
      if (!('pictureInPictureEnabled' in document)) {
        pipButton.classList.add(classes['Hidden']);
      }
    });
    document.addEventListener('keyup', keyboardShortcuts);
    return () => {
      video.removeEventListener('play', updatePlayButton);
      video.removeEventListener('pause', updatePlayButton);
      video.removeEventListener('loadedmetadata', initializeVideo);
      video.removeEventListener('timeupdate', updateTimeElapsed);
      video.removeEventListener('timeupdate', updateProgress);
      seek.removeEventListener('mousemove', updateSeekTooltip);
      seek.removeEventListener('input', skipAhead);
      video.removeEventListener('volumechange', updateVolumeIcon);
      props.videoContainerRef.current.removeEventListener(
        'fullscreenchange',
        updateFullscreenButton
      );
      document.removeEventListener('DOMContentLoaded', () => {
        if (!('pictureInPictureEnabled' in document)) {
          pipButton.classList.add(classes['Hidden']);
        }
      });
      document.removeEventListener('keyup', keyboardShortcuts);
    };
    // eslint-disable-next-line
  }, [
    props.videoRef,
    props.videoContainerRef,
    pipButton,
    updatePlayButton,
    initializeVideo,
    updateTimeElapsed,
    updateProgress,
    updateSeekTooltip,
    skipAhead,
    updateVolumeIcon,
    updateFullscreenButton,
    keyboardShortcuts,
  ]);

  return {
    setProgressBarValue,
    setSeekValue,
    toggleMute,
    updateVolume,
    togglePip,
    toggleFullScreen,
    seekValue,
    progressBarValue,
    volume,
  };
};

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
}

export const useVideo = (refs, classes, controlsClasses) => {
  useEffect(() => {
    //Returns a string that specifies whether the client can play a given media resource type
    const videoSupport = !!document.createElement('video').canPlayType;
    if (videoSupport) {
      refs['videoRef'].current.controls = false;
      refs['videoControlsRef'].current.classList.remove(
        controlsClasses['Hidden']
      );
    }
    // eslint-disable-next-line
  }, []);

  const togglePlay = () => {
    if (refs['videoRef'].current.paused || refs['videoRef'].current.ended) {
      refs['videoRef'].current.play();
    } else {
      refs['videoRef'].current.pause();
    }
  };

  const animatePlayback = () => {
    refs['playbackAnimationRef'].current.animate(
      [
        {
          opacity: 1,
          transform: 'scale(1)',
        },
        {
          opacity: 0,
          transform: 'scale(1.3)',
        },
      ],
      {
        duration: 500,
      }
    );
    if (refs['videoRef'].current.paused || refs['videoRef'].current.ended) {
      refs['playRef'].current.classList.add(classes['Hidden']);
      refs['pauseRef'].current.classList.remove(classes['Hidden']);
    } else {
      refs['playRef'].current.classList.remove(classes['Hidden']);
      refs['pauseRef'].current.classList.add(classes['Hidden']);
    }
  };

  const hideControls = () => {
    if (refs['videoRef'].current.paused) return;
    refs['videoControlsRef'].current.classList.add(classes['Hide']);
  };

  const showControls = () => {
    refs['videoControlsRef'].current.classList.remove(classes['Hide']);
  };

  return {
    togglePlay,
    animatePlayback,
    hideControls,
    showControls,
  };
};
