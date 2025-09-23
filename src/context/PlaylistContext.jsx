import React, { createContext, useContext, useState } from "react";

export const PlaylistContext = createContext();


export const usePlaylist = () => useContext(PlaylistContext);

export const PlaylistProvider = ({ children }) => {
  const [playlists, setPlaylists] = useState([]);

  const createPlaylist = (name) => {
    if (!name) return;
    setPlaylists((prev) => [...prev, { id: Date.now(), name, songs: [] }]);
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId ? { ...pl, songs: [...pl.songs, song] } : pl
      )
    );
  };

  return (
    <PlaylistContext.Provider
      value={{ playlists, createPlaylist, addSongToPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
