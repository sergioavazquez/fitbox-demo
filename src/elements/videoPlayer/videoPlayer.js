import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ReactComponent as PlayIcon } from '../../static/player/play.svg';
import { ReactComponent as PauseIcon } from '../../static/player/pause.svg';
import { ReactComponent as Loading } from '../../static/player/loading.svg';
import styles from './video.module.scss';


const VideoPlayer = ({ src, monitor, onFinish }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInterfaceVisible, setIsInterfaceVisible] = useState(true);
  const [videoDuration, setVideoDuration] = useState("--:--");
  const [videoProgress, setVideoProgress] = useState("00:00");

  const videoRef = useRef();

  // Event handlers
  const onPlayerLoading = useCallback(
    (e) => {
      if (e.type === 'canplaythrough') {
        const duration = parseTime(videoRef.current.duration);
        setVideoDuration(duration);
        setTimeout(() => { setIsLoading(false) }, 1000);
      } else {
        setIsLoading(true);
      }
    }, []
  )

  const onPlayerStateChange = useCallback(
    (e) => {
      if (e.type === 'play') {
        setIsPlaying(true);
        setIsInterfaceVisible(false);
      } else {
        setIsPlaying(false);
        setIsInterfaceVisible(true);
      }
    }, []
  )

  const onTimeUpdate = useCallback(
    () => {
      const progress = parseTime(videoRef.current.currentTime);
      setVideoProgress(progress);
      monitor.log(videoRef.current.currentTime);
    }, [monitor]
  )

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('canplaythrough', onPlayerLoading);
    video.addEventListener('play', onPlayerStateChange);
    video.addEventListener('pause', onPlayerStateChange);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onFinish);
    return (() => {
      video.removeEventListener('canplaythrough', onPlayerLoading);
      video.removeEventListener('play', onPlayerStateChange);
      video.removeEventListener('pause', onPlayerStateChange);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onFinish);
    })
  }, [onPlayerLoading, onTimeUpdate, onPlayerStateChange, onFinish]);


  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  const play = () => {
    videoRef.current.play();
  }

  const pause = () => {
    videoRef.current.pause();
  }

  const parseTime = (secs) => {
    const totalMins = ("0" + Math.floor(secs / 60)).slice(-2);
    const totalsecs = ("0" + Math.floor(secs % 60)).slice(-2);
    return `${totalMins}:${totalsecs}`;
  }

  const fetchPlayerInterface = () => {
    const playIcon = <PlayIcon className={styles.playerIcons} />;
    const pauseIcon = <PauseIcon className={styles.playerIcons} />;
    let render;
    if (!isLoading) {
      render = isPlaying ? pauseIcon : playIcon;
    } else {
      render = <Loading className={styles.playerIcons} />
    }
    return render;
  }

  const fetchInterfaceClass = () => {
    return isInterfaceVisible ? styles.playerInterface : [styles.playerInterface, styles.hide].join(' ');
  }

  return (
    <div className={styles.videoWrapper}>
      <div className={fetchInterfaceClass()} onClick={togglePlay}>
        {fetchPlayerInterface()}
      </div>
      <div className={styles.statusBar}>{`${videoProgress} / ${videoDuration}`}</div>
      <video className={styles.videoPlayer} src={src} ref={videoRef} controls playsInline></video>
    </div>
  )
}

export default VideoPlayer;