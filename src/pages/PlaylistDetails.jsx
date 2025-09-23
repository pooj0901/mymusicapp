
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaDownload } from "react-icons/fa";
import { usePlaylist } from "../context/PlaylistContext";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";

export default function PlaylistDetails() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { playlists, removeSongFromPlaylist } = usePlaylist();
  const { playSong } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();

  const playlist = playlists.find((pl) => pl.id === Number(playlistId));

  if (!playlist) {
    return (
      <main className="max-w-6xl mx-auto px-4 pb-32 text-white">
        <h1 className="text-2xl">Playlist not found</h1>
      </main>
    );
  }

  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.mp3`;
    link.click();
  };

  return (
    <main className="max-w-6xl mx-auto px-4 pb-32 text-white">
   
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-6">{playlist.name}</h1>

      {playlist.songs.length === 0 ? (
        <p className="text-gray-400">No songs in this playlist yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlist.songs.map((song, i) => {
            const isLiked = likedSongs.some((s) => s.id === song.id);

            return (
              <motion.div
                key={song.id + "-" + i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, backgroundColor: "#1f2937" }}
                className="bg-gray-900 p-4 rounded-xl shadow-md flex flex-col cursor-pointer"
              >
              
                <div
                  className="w-full h-40 rounded-lg overflow-hidden mb-3"
                  onClick={() => playSong(song)}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-full h-full object-cover"
                  />
                </div>

             
                <div
                  className="flex-1"
                  onClick={() => playSong(song)}
                >
                  <p className="text-white font-medium truncate">{song.title}</p>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                </div>

               
                <div className="flex items-center justify-between mt-3 text-lg">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song);
                    }}
                    className={isLiked ? "text-pink-500" : "text-gray-400 hover:text-pink-500 transition"}
                  >
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(song.url, song.title);
                    }}
                    className="text-gray-400 hover:text-green-500 transition"
                  >
                    <FaDownload />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSongFromPlaylist(playlist.id, song.id);
                    }}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </main>
  );
}
