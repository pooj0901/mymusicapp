
import React, { createContext, useState, useContext } from "react";

export const DownloadContext = createContext();

export function DownloadProvider({ children }) {
  const [downloadedSongs, setDownloadedSongs] = useState([]);

  const toggleDownload = (songId) => {
    setDownloadedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );
  };

  return (
    <DownloadContext.Provider value={{ downloadedSongs, toggleDownload }}>
      {children}
    </DownloadContext.Provider>
  );
}


export const useDownload = () => useContext(DownloadContext);
