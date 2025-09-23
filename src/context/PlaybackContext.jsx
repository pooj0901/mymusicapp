import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const PlaybackContext = createContext();

export function PlaybackProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const playSong = (song) => {
    const audio = audioRef.current;
    if (!song) return;
    if (currentSong?.id !== song.id) {
      audio.src = song.audio;
      setCurrentSong(song);
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else {
      audio.play().catch(() => {});
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
  };

  const togglePlay = () => {
    if (isPlaying) pauseSong();
    else audioRef.current.play().catch(() => {});
  };

  const seek = (time) => {
    if (audioRef.current.duration) audioRef.current.currentTime = Math.min(Math.max(0, time), audioRef.current.duration);
  };

  return (
    <PlaybackContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        playSong,
        pauseSong,
        togglePlay,
        seek,
        setCurrentSong,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}

export function usePlayback() {
  return useContext(PlaybackContext);
}
