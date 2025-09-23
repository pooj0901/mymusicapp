import React from "react";
import { motion } from "framer-motion";

export default function SongCard({ song, index = 0, onPlay }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer bg-gray-800"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: index * 0.06 }}
      onClick={() => onPlay && onPlay(song)}
    >
   
      <img
        src={song.image}
        alt={song.title}
        className="w-full h-48 object-cover"
      />

 
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">{song.title}</h3>
        <p className="text-gray-300 text-sm truncate">{song.artist}</p>
      </div>
    </motion.div>
  );
}
