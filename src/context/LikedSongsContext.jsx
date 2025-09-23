
import React, { createContext, useContext, useState } from "react";

const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  const addSong = (song) => {
    if (!likedSongs.some((s) => s.id === song.id)) setLikedSongs([...likedSongs, song]);
  };

  const removeSong = (songId) => setLikedSongs(likedSongs.filter((s) => s.id !== songId));

  const toggleLike = (song) => (isLiked(song.id) ? removeSong(song.id) : addSong(song));

  const isLiked = (songId) => likedSongs.some((s) => s.id === songId);

  return (
    <LikedSongsContext.Provider value={{ likedSongs, addSong, removeSong, toggleLike, isLiked }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => useContext(LikedSongsContext);
