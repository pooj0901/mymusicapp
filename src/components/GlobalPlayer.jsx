import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaDownload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";
import { usePlaylist } from "../context/PlaylistContext";

export default function GlobalPlayer() {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, audioRef } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();
  const { playlists, createPlaylist, addSongToPlaylist } = usePlaylist();

  const [progress, setProgress] = useState(0);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    if (!audioRef.current) return;
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
  }, [audioRef, playNext]);

  if (!currentSong) return null;

  const isLiked = likedSongs.some((s) => s.id === currentSong.id);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentSong.audio;
    link.download = `${currentSong.title}.mp3`;
    link.click();
  };

  const handleAddToPlaylist = (playlistId) => {
    addSongToPlaylist(playlistId, currentSong);
    setShowPlaylistModal(false);
  };

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName.trim());
    setNewPlaylistName("");
  };

  return (
    <>
      
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 lg:w-1/2 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-4 flex items-center gap-4 md:gap-6 z-50 shadow-xl">
      
        <img
          src={currentSong.image || currentSong.cover || "/default-cover.jpg"}
          alt={currentSong.title}
          className="w-16 h-16 object-cover rounded-xl shadow-md"
        />

        
        <div className="flex-1 flex flex-col justify-center overflow-hidden">
          <p className="text-white font-semibold text-lg truncate">{currentSong.title || "Unknown Title"}</p>
          <p className="text-gray-300 text-sm truncate">{currentSong.artist || "Unknown Artist"}</p>
          <div className="h-2 w-full bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

       
        <div className="flex items-center gap-3 md:gap-4 text-white text-xl">
          <button
            onClick={() => toggleLike(currentSong)}
            className="hover:text-pink-500 transition-all duration-200"
          >
            {isLiked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
          </button>

          <button
            onClick={playPrevious}
            className="hover:text-green-500 transition-colors duration-200"
          >
            <FaStepBackward />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600 text-black rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={playNext}
            className="hover:text-green-500 transition-colors duration-200"
          >
            <FaStepForward />
          </button>

          <button
            onClick={handleDownload}
            className="hover:text-green-400 transition-colors duration-200"
          >
            <FaDownload />
          </button>

          <button
            onClick={() => setShowPlaylistModal(true)}
            className="hover:text-blue-400 transition-colors duration-200"
          >
            <FaPlus />
          </button>
        </div>
      </div>

     
      {showPlaylistModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 sm:p-6"
          onClick={() => setShowPlaylistModal(false)}
        >
          <div
            className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-6 sm:p-8 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl flex flex-col gap-6 relative"
            onClick={(e) => e.stopPropagation()} // prevent modal close when clicking inside
          >
            <button
              onClick={() => setShowPlaylistModal(false)}
              className="absolute top-4 right-4 text-gray-200 hover:text-white text-2xl transition-colors duration-200"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">Add to Playlist</h2>

            <div className="flex flex-col gap-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {playlists.length === 0 ? (
                <p className="text-gray-300 text-center sm:text-left">No playlists yet.</p>
              ) : (
                playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => handleAddToPlaylist(pl.id)}
                    className="text-left text-white hover:text-green-400 px-4 py-2 rounded-xl backdrop-blur-md bg-white/5 hover:bg-white/10 transition-colors duration-200 truncate"
                  >
                    {pl.name}
                  </button>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="New playlist..."
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-gray-400 outline-none text-lg transition-all duration-200"
              />
              <button
                onClick={handleCreatePlaylist}
                className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-3 rounded-xl hover:scale-105 text-white font-semibold text-lg transition-all duration-200"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
