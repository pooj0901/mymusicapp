import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const albums = [
  { name: "Metro...In Dino", cover: "/images/metro.jpg" },
  { name: "Aashiqui 2", cover: "/images/ashiqui2.jpg" },
  { name: "Yeh Jawani Hai Deewani", cover: "/images/yjhd.jpg" },
  { name: "Kedarnath", cover: "/images/kedarnath.jpg" },
];

export default function Album() {
  const navigate = useNavigate();

  return (
    <main className="max-w-6xl mx-auto px-4 pb-32">
      <h1 className="text-3xl font-bold my-6 text-white">Albums</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {albums.map((album) => (
          <motion.div
            key={album.name}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
            onClick={() => navigate(`/album/${encodeURIComponent(album.name)}`)}
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-800 relative group">
              <img
                src={album.cover}
                alt={album.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-base font-semibold text-white mt-3 truncate">
              {album.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
