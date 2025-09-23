
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLikedSongs } from "../context/LikedSongsContext";
import { usePlayer } from "../context/PlayerContext";

export default function Library() {
  const navigate = useNavigate();
  const { likedSongs, removeSong, isLiked } = useLikedSongs();
  const { playSong } = usePlayer();

  return (
    <motion.main
      className="max-w-5xl mx-auto px-4 pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
    
      <div
        className="flex items-center cursor-pointer bg-black bg-opacity-50 px-3 py-1 rounded-full w-max mb-6"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="text-white mr-2" />
        <span className="text-white font-semibold">Back</span>
      </div>

      <h1 className="text-4xl font-bold text-white mb-6">Liked Songs</h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">You have no liked songs yet.</p>
      ) : (
        <ul className="space-y-3">
          {likedSongs.map((song) => (
            <motion.li
              key={song.id}
              onClick={() => playSong(song)}
              className="flex items-center justify-between bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-14 h-14 rounded-md object-cover mr-4"
                />
                <div>
                  <p className="text-white font-semibold">{song.title}</p>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>

            
              <button
                className="text-white hover:text-pink-500 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  isLiked(song.id) && removeSong(song.id);
                }}
              >
                <FaHeart className={isLiked(song.id) ? "text-pink-500" : ""} />
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.main>
  );
}
