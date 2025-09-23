import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const artistsData = [
  { name: "Arijit Singh", cover: "/images/arijit.jpg" },
  { name: "Shreya Ghoshal", cover: "/images/shreya.jpg" },
  { name: "K.K", cover: "/images/kk.jpg" },
  { name: "Javed Ali", cover: "/images/javed.jpg" },
];

export default function Artist() {
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-4 pb-32">
      <h1 className="text-3xl font-bold my-6 text-white">Artists</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {artistsData.map((artist) => (
          <motion.div
            key={artist.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => navigate(`/artist/${encodeURIComponent(artist.name)}`)}
          >
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-gray-800 border-2 border-white/20">
              <img
                src={artist.cover}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-white mt-3">
              {artist.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
