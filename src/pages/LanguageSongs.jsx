import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";
import { useSearch } from "../context/SearchContext";


const SONGS = {
  hindi: [
    { id: 1, title: "Apna Bana Le Piya", artist: "Arijit Singh, Amitabh Bhattacharya, Sachin–Jigar", audio: "/songs/hindi1.mp3", image: "/images/hindi1.jpg" },
    { id: 2, title: "Ishq Hai", artist: " Amarabha Banerjee, Anurag Saikia, Raj Shekhar, Varun Jain, Madhubanti Bagchi, Romy", audio: "/songs/hindi2.mp3", image: "/images/hindi2.jpg" },
    { id: 3, title: "Soni Soni", artist: " Darshan Raval, Jonita Gandhi, Rochak Kohli", audio: "/songs/hindi3.mp3", image: "/images/hindi3.jpg" },
    { id: 4, title: "Tum Hi Ho", artist: "Arijit Singh", audio: "/songs/hindi4.mp3", image: "/images/ashiqui2.jpg" },
    { id: 5, title: "Fakira", artist: "Sanam Puri, Neeti Mohan, Vishal–Shekhar", audio: "/songs/hindi5.mp3", image: "/images/hindi5.jpg" },
    { id: 6, title: "Peheli Dafa", audio: "/hindi6.mp3", image: "/images/hindi6.jpg" },
  ],
  english: [
    { id: 7, title: "Timber", artist: "Ed Sheeran", audio: "/songs/english1.mp3", image: "/images/english1.jpg"},
    { id: 8, title: "I Wanna Be Yours", artist: "The Weeknd", audio: "/songs/english2.mp3", image: "/images/english2.png"},
    { id: 9, title: "StarBoy", artist: "Dua Lipa", audio: "/songs/english3.mp3", image: "/images/english3.jpg"},
    { id: 10, title: "Rain Over Me", artist: "Shawn Mendes", audio: "/songs/english4.mp3", image: "/images/english4.jpg"},
    { id: 11, title: "Faded", artist: "Ed Sheeran", audio: "/songs/english5.mp3", image: "/images/english5.jpg"},
    { id: 12, title: "The Spectre", artist: "Justin Bieber",audio: "/songs/english6.mp3", image: "/images/english6.jpg"},
  ],
 marathi: [
    { id: 13, title: "Mitwa", artist: "Caralisa Monteiro, Shafqat Amanat Ali, Shankar Mahadevan", audio: "/songs/marathi1.mp3", image: "/images/marathi1.jpg" },
    { id: 14, title: "Sukh Kalale", artist: "Ajay-Atul, Shreya Ghoshal", audio: "/songs/marathi2.mp3", image: "/images/marathi2.jpg" },
    { id: 15, title: "Mauli Mauli", artist: "Ajay-Atul", audio: "/songs/marathi3.mp3", image: "/images/marathi3.jpg" },
    { id: 16, title: "Hridayat Vaje Something", artist: "Vidhit Patankar", audio: "/songs/marathi4.mp3", image: "/images/marathi4.jpg" },
    { id: 17, title: "Kadhi Tu", artist: "Hrishikesh Ranade", audio: "/songs/marathi5.mp3", image: "/images/marathi5.jpg" },
    { id: 18, title: "Lajran Sajra Mukhda", artist: "Prashant Nakti, Keval Walanj, Sonali Sonawane", audio: "/songs/marathi6.mp3", image: "/images/marathi6.jpg" },
  ],
   punjabi: [
    { id: 19, title: "Lahore", artist: "Guru Randhawa", audio: "/songs/punjabi1.mp3", image: "/images/punjabi1.jpg"  },
    { id: 20, title: "Sanu Khendi", artist: "Brijesh Shandilya, Tanishk Bagchi, Kumaar, Romy", audio: "/songs/punjabi2.mp3", image: "/images/punjabi2.jpg" },
    { id: 21, title: "Ishq Di Baajiyaan", artist: "Diljit Dosanjh, Shankar–Ehsaan–Loy", audio: "/songs/punjabi3.mp3", image: "/images/punjabi3.jpg" },
    { id: 22, title: "Laungda Lashkara", artist: "Hard Kaur, Jasbir Jassi, Mahalakshmi Iyer, Jassi", audio: "/songs/punjabi4.mp3", image: "/images/punjabi4.jpg" },
    { id: 23, title: "Sauda Khara Khara", artist: "Sukhbir, Lijo George, DJ Chetas, Dhvani Bhanushali, Kumaar, Diljit Dosanjh", audio: "/songs/punjabi5.mp3", image: "/images/punjabi5.jpg" },
    { id: 24, title: "Morni bBanke", artist: "Panjabi MC, Neha Kakkar, Guru Randhawa, Tanishk Bagchi", audio: "/songs/punjabi6.mp3", image: "/images/punjabi6.jpg"},
  ],
};

const LANG_COLORS = {
  Hindi: "from-pink-500 via-red-500 to-red-700",
  English: "from-blue-500 via-purple-500 to-indigo-700",
  Marathi: "from-green-500 via-emerald-500 to-teal-700",
  Punjabi: "from-red-500 via-yellow-500 to-orange-700",
};

export default function LanguageSongs() {
  const { language } = useParams();
  const navigate = useNavigate();
  const langKey = language?.toLowerCase();
  const langSongs = SONGS[langKey];
  const langColor = LANG_COLORS[langKey] || "from-gray-600 via-gray-700 to-gray-800";

  const { playSong } = usePlayer();
  const { likedSongs, addSong, removeSong, isLiked } = useLikedSongs();
  const { query } = useSearch();

  if (!langSongs) return <Navigate to="/languages" replace />;

  const decodedLanguage = decodeURIComponent(language);

  const filteredSongs = langSongs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.main
      className="max-w-5xl mx-auto px-4 pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      
      <div className="relative w-full h-64 rounded-b-2xl shadow-xl overflow-hidden mb-8">
        <div className={`absolute inset-0 bg-gradient-to-br ${langColor}`}></div>
        <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-black via-transparent"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
          <h1 className="text-5xl font-bold text-white">{decodedLanguage}</h1>
          <p className="text-gray-300 mt-2">{filteredSongs.length} Songs</p>
        </div>
      </div>

      
      <motion.ul className="space-y-3">
        {filteredSongs.map((song) => (
          <motion.li
            key={song.id}
            onClick={() => playSong(song, langSongs)} 
            className="relative flex items-center p-2 bg-gray-900 bg-opacity-70 rounded-xl backdrop-blur-md cursor-pointer hover:scale-105 transform transition shadow-md"
          >
            <img
              src={song.image}
              alt={song.title}
              className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover mr-3"
            />
            <div className="flex-1">
              <p className="text-white font-semibold text-base">{song.title}</p>
              <p className="text-gray-400 text-sm">{song.artist}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{song.duration}</span>
              <button
                className="text-white hover:text-pink-500 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  isLiked(song.id) ? removeSong(song.id) : addSong(song);
                }}
              >
                <FaHeart className={isLiked(song.id) ? "text-pink-500" : ""} />
              </button>
            </div>
          </motion.li>
        ))}
        {filteredSongs.length === 0 && (
          <p className="text-gray-400 text-center mt-4">No songs found.</p>
        )}
      </motion.ul>
    </motion.main>
  );
}
