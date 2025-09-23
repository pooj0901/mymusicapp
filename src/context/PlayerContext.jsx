
import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);


  const playSong = (song, songsList = [song]) => {
    setPlaylist(songsList);
    const index = songsList.findIndex((s) => s.id === song.id);
    setCurrentIndex(index);
    setCurrentSong(song);

    if (audioRef.current.src !== song.audio) {
      audioRef.current.src = song.audio;
    }

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn("Playback error:", err));
  };


  const playNext = () => {
    if (!playlist.length) return;
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentIndex(nextIndex);
    const nextSong = playlist[nextIndex];
    setCurrentSong(nextSong);

    audioRef.current.src = nextSong.audio;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn("Playback error:", err));
  };


  const playPrevious = () => {
    if (!playlist.length) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentIndex(prevIndex);
    const prevSong = playlist[prevIndex];
    setCurrentSong(prevSong);

    audioRef.current.src = prevSong.audio;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.warn("Playback error:", err));
  };


  const togglePlay = () => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn("Playback error:", err));
    }
  };


  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", playNext);
    };
  }, [currentIndex, playlist]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playlist,
        currentIndex,
        isPlaying,
        progress,
        playSong,
        playNext,
        playPrevious,
        togglePlay,
        audioRef,
        setPlaylist,
        setCurrentSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
