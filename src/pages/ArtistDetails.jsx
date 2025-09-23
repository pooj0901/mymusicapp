import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";


const artistWallpapers = {
  "Arijit Singh": "/images/arijit_wall.jpg",
  "Shreya Ghoshal": "/images/shreya_wall.jpg",
  "K.K": "/images/kk_wall.jpg",
  "Javed Ali": "/images/javed_wall.jpg",
};


const songs = [
  { id: 1, title: "O Zaalima", artist: "Arijit Singh", cover: "/images/arijit1.jpg", audio: "/songs/arijit1.mp3" },
  { id: 2, title: "Kesariya", artist: "Arijit Singh", cover: "/images/arijit2.jpg", audio: "/songs/arijit2.mp3" },
  { id: 3, title: "Humdard", artist: "Arijit Singh", cover: "/images/arijit3.jpg", audio: "/songs/arijit3.mp3" },
  { id: 4, title: "Khairiyaat", artist: "Arijit Singh", cover: "/images/arijit4.jpg", audio: "/songs/arijit4.mp3" },

  { id: 5, title: "Tu Thodi Der", artist: "Shreya Ghoshal", cover: "/images/shreya1.jpg", audio: "/songs/shreya1.mp3" },
  { id: 6, title: "Manwa Lage", artist: "Shreya Ghoshal", cover: "/images/shreya2.jpg", audio: "/songs/shreya2.mp3" },
  { id: 7, title: "Pinga G Pori Pinga", artist: "Shreya Ghoshal", cover: "/images/shreya3.jpg", audio: "/songs/shreya3.mp3" },
  { id: 8, title: "Teri Ore", artist: "Shreya Ghoshal", cover: "/images/shreya4.jpg", audio: "/songs/shreya4.mp3" },

  { id: 9, title: "Tu Jo Mila", artist: "K.K", cover: "/images/kk1.jpg", audio: "/songs/kk1.mp3" },
  { id: 10, title: "Sach Keh Rha Hai Deewana", artist: "K.K", cover: "/images/kk2.jpg", audio: "/songs/kk2.mp3" },
  { id: 11, title: "Zara Sa", artist: "K.K", cover: "/images/kk3.jpg", audio: "/songs/kk3.mp3" },
  { id: 12, title: "Piya Aaye Na", artist: "K.K", cover: "/images/kk4.jpg", audio: "/songs/kk4.mp3" },

  { id: 13, title: "Jashn-E-Bahaara", artist: "Javed Ali", cover: "/images/javed1.jpg", audio: "/songs/javed1.mp3" },
  { id: 14, title: "Tera Deedar Hua", artist: "Javed Ali", cover: "/images/javed2.jpg", audio: "/songs/javed2.mp3" },
  { id: 15, title: "Srivalli", artist: "Javed Ali", cover: "/images/javed3.jpg", audio: "/songs/javed3.mp3" },
  { id: 16, title: "Tum Tak", artist: "Javed Ali", cover: "/images/javed4.jpg", audio: "/songs/javed4.mp3" },
];

export default function ArtistDetails() {
  const { artistName } = useParams();
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();

  const artistSongs = songs.filter((s) => s.artist === artistName);


  const artistWallpaper = artistWallpapers[artistName] || artistSongs[0]?.cover;

  return (
    <main className="max-w-5xl mx-auto px-4 pb-32">
  
      <div
        className="w-full h-64 rounded-b-xl shadow-lg bg-cover bg-center relative"
        style={{ backgroundImage: `url(${artistWallpaper})` }}
      >
        <div
          className="absolute top-4 left-4 flex items-center cursor-pointer bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-80 transition"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-white mr-2" />
          <span className="text-white font-semibold">Back</span>
        </div>
        <h1 className="absolute bottom-4 left-6 text-4xl font-bold text-white">
          {artistName}
        </h1>
      </div>

   
      <div className="mt-8 space-y-3">
        {artistSongs.map((song, i) => {
          const isLiked = likedSongs.some((s) => s.id === song.id);
          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02, backgroundColor: "#1f2937" }}
              className="flex items-center justify-between p-4 bg-gray-900 rounded-xl shadow-md transition-colors cursor-pointer"
              onClick={() => playSong(song, artistSongs)}
            >
           
              <img
                src={song.cover}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover mr-4"
              />
              <div className="flex-1">
                <p className="text-white font-medium">{song.title}</p>
              </div>

           
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(song);
                }}
                className="text-gray-400 hover:text-pink-500 transition"
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </button>
            </motion.div>
          );
        })}

        {artistSongs.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No songs found.</p>
        )}
      </div>
    </main>
  );
}
