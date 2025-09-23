
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";


const FESTIVAL_DATA = {
  Navratri: {
    wallpaper: "/images/navratribg.jpg",
    songs: [
      { id: 1, title: "Kamariya", artist: "Darshan Raval, DJ Chetas", image: "/images/navratri1.jpg", audio: "/songs/navratri1.mp3" },
      { id: 2, title: "Nagada Sang Dhol Baje", artist: "Osman Mir, Shreya Ghoshal", image: "/images/navratri2.jpg", audio: "/songs/navratri2.mp3" },
      { id: 3, title: "Chogada Tara", artist: "Darshan Raval, Asees Kaur", image: "/images/navratri3.jpg", audio: "/songs/navratri3.mp3" },
    ],
  },
  Holi: {
    wallpaper: "/images/holibg.jpg",
    songs: [
      { id: 4, title: "Badri Ki Dhulaniya", artist: "Neha Kakkar, Monali Thakur, Dev Negi, Ikka Singh", image: "/images/holi1.jpg", audio: "/songs/holi1.mp3" },
      { id: 5, title: "Holi Khele Raghuvera", artist: "Amitabh Bachchan, Sukhwinder Singh, Udit Narayan, Alka Yagnik", image: "/images/holi2.jpg", audio: "/songs/holi2.mp3" },
      { id: 6, title: "Balam Pichkari", artist: "Shalmali Kholgade, Vishal Dadlani, Pritam Chakraborty, Amitabh Bhattacharya", image: "/images/holi3.jpg", audio: "/songs/holi3.mp3" },
    ],
  },
  Ganpati: {
    wallpaper: "/images/ganpatibg.jpg",
    songs: [
      { id: 7, title: "Deva Shree Ganesha", artist: "Ajay-Atul, Ajay Gogavale", image: "/images/ganpati1.jpg", audio: "/songs/ganpati1.mp3" },
      { id: 8, title: "Bappa Bappa Mourya Re", artist: "Vishal Dadlani", image: "/images/ganpati3.jpg", audio: "/songs/ganpati2.mp3" },
      { id: 9, title: "Mourya Re", artist: "Shankar Mahadevan", image: "/images/ganpati2.jpg", audio: "/songs/ganpati3.mp3" },
    ],
  },
};

export default function FestivalPage() {
  const { festivalName } = useParams();
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();

  
  const festivalKey = festivalName.charAt(0).toUpperCase() + festivalName.slice(1).toLowerCase();
  const festival = FESTIVAL_DATA[festivalKey];

  if (!festival) return <div className="text-center text-white p-10">Festival not found!</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
    
      <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
        <img src={festival.wallpaper} alt={festivalKey} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{festivalKey} Special</h1>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
        >
          <FaArrowLeft />
        </button>
      </div>

     
      <div className="space-y-4">
        {festival.songs.map((song) => {
          const isLiked = likedSongs.includes(song.id);
          return (
            <motion.div
              key={song.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 bg-zinc-900 rounded-lg p-3 shadow-md cursor-pointer"
              onClick={() => playSong(song, festival.songs)}
            >
              <img src={song.image} alt={song.title} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1">
                <h3 className="text-white font-semibold">{song.title}</h3>
                <p className="text-gray-400 text-sm">{song.artist}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
                className="text-white hover:text-red-500"
              >
                {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
