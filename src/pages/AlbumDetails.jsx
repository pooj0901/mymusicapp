import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";


const albums = [
  {
    name: "Metro...In Dino",
    wallpaper: "/images/metrobg.jpg",
    songs: [
      { id: 1, title: "Maan Yeh Mera", artist: "Arijit Singh", cover: "/images/metro.jpg", audio: "/songs/metro1.mp3"},
      { id: 2, title: "Qayde Se", artist: "Arijit Singh", cover: "/images/metro.jpg", audio: "/songs/metro2.mp3" },
      { id: 3, title: "Dhaghina Dhinak Dhin", artist: "Arijit Singh", cover: "/images/metro.jpg", audio: "/songs/metro3.mp3"},
      { id: 4, title: "Yaad", artist: "Arijit Singh", cover: "/images/metro.jpg", audio: "/songs/metro4.mp3" },
      { id: 5, title: "Aur Kitni Mohobaat Karu", artist: "Arijit Singh", cover: "/images/metro.jpg", audio: "/songs/metro5.mp3" },
      { id: 6, title: "Zaamana Laage", artist: "Arijit Singh", cover: "/images/metro.jpg", audio: "/songs/metro6.mp3" },
    ],
  },
  {
    name: "Aashiqui 2",
    wallpaper: "/images/ashiqui2bg.jpg",
    songs: [
      { id: 7, title: "Meri Ashiqui", artist: "Arijit Singh", cover: "/images/ashiqui2.jpg", audio: "/songs/ashiqui1.mp3"},
      { id: 8, title: "Chahun Main Ya Na", artist: "Palak Muchhal, Arijit Singh", cover: "/images/ashiqui2.jpg", audio: "/songs/ashiqui2.mp3" },
      { id: 9, title: "Tum Hi Ho", artist: "Mithoon, Arijit Singh", cover: "/images/ashiqui2.jpg", audio: "/songs/ashiqui3.mp3" },
      { id: 10, title: "Sunn Raha Hai Na", artist: "Ankit Tiwari", cover: "/images/ashiqui2.jpg", audio: "/songs/ashiqui4.mp3" },
      { id: 11, title: "Hum Mar Jayenge", artist: "Tulsi Kumar, Arijit Singh", cover: "/images/ashiqui2.jpg", audio: "/songs/ashiqui5.mp3" },
      { id: 12, title: "Milne Hai Mujse Aayi", artist: "Arijit Singh", cover: "/images/ashiqui2.jpg", audio: "/songs/ashiqui6.mp3" },
    ],
  },
  {
    name: "Yeh Jawani Hai Deewani",
    wallpaper: "/images/yjhdbg.jpg",
    songs: [
      { id: 13, title: "Dilliwali Girlfriend", artist: "Pritam, Arijit Singh, Sunidhi Chauhan", cover: "/images/yjhd.jpg", audio: "/songs/yehjawani1.mp3" },
      { id: 14, title: "Ilahi", artist: "Pritam, Arijit Singh", cover: "/images/yjhd.jpg", audio: "/songs/yehjawani2.mp3" },
      { id: 15, title: "Kabira", artist: "Pritam, Tochi Raina, Rekha Bhardwaj", cover: "/images/yjhd.jpg", audio: "/songs/yehjawani3.mp3" },
      { id: 16, title: "Subhanallah", artist: "Pritam, Sreeram, Shilpa Rao", cover: "/images/yjhd.jpg", audio: "/songs/yehjawani4.mp3" },
      { id: 17, title: "Ghagra", artist: "Pritam, Rekha Bhardwaj, Vishal Dadlani", cover: "/images/yjhd.jpg", audio: "/songs/yehjawani5.mp3" },
      { id: 18, title: "Badtameez Dil", artist: "Pritam, Benny Dayal, Shefali Alvares", cover: "/images/yjhd.jpg", audio: "/songs/yehjawani6.mp3" },
    ],
  },
  {
    name: "Kedarnath",
    wallpaper: "/images/kedarnathbg.jpg",
    songs: [
      { id: 19, title: "Namo Namo", artist: "Amit Trivedi", cover: "/images/kedarnath.jpg", audio: "/songs/kedarnath1.mp3"},
      { id: 20, title: "Sweetheart", artist: "Amit Tivedi, Dev Negi", cover: "/images/kedarnath.jpg", audio: "/songs/kedarnath2.mp3" },
      { id: 21, title: "Qaafirana", artist: "Arijit Singh, Amit Trivedi, Nikhita Gandhi", cover: "/images/kedarnath.jpg", audio: "/songs/kedarnath4.mp3" },
      { id: 22, title: "Jaan Nisar", artist: "Amit Trivedi, Asees kaur", cover: "/images/kedarnath.jpg", audio: "/songs/kedarnath3.mp3"},
    ],
  },
];

export default function AlbumDetails() {
  const { albumName } = useParams();
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();

  const album = albums.find((a) => a.name === albumName);

  if (!album) {
    return <p className="text-white text-center mt-10">Album not found</p>;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 pb-32">
      
      <div
        className="w-full h-96 rounded-b-xl shadow-lg bg-cover bg-center relative"
        style={{ backgroundImage: `url(${album.wallpaper})` }}
      >
        <div
          className="absolute top-4 left-4 flex items-center cursor-pointer bg-black bg-opacity-50 px-3 py-1 rounded-full hover:bg-opacity-80 transition"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="text-white mr-2" />
          <span className="text-white font-semibold">Back</span>
        </div>
        <div className="bg-gradient-to-t from-black via-transparent w-full p-6 rounded-b-xl absolute bottom-0 left-0">
          <h1 className="text-5xl font-bold text-white">{album.name}</h1>
          <p className="text-gray-300">{album.songs.length} Songs</p>
        </div>
      </div>

      
      <div className="mt-8 space-y-3">
        {album.songs.map((song, i) => {
          const isLiked = likedSongs.some((s) => s.id === song.id);
          return (
            <motion.div
              key={song.id}
              whileHover={{ scale: 1.02, backgroundColor: "#1f2937" }}
              className="flex items-center justify-between p-4 bg-gray-900 rounded-xl shadow-md cursor-pointer"
              onClick={() => playSong(song, album.songs)}
            >
              <div className="flex items-center flex-1">
                <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="ml-4">
                  <p className="text-white font-medium">{song.title}</p>
                  <p className="text-gray-400 text-sm">{song.artist}</p>
                </div>
              </div>
              <div className="text-gray-400 mr-6">{song.duration}</div>
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
      </div>
    </main>
  );
}
