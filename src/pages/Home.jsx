import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import { useLikedSongs } from "../context/LikedSongsContext";
import { useSearch } from "../context/SearchContext";
import { usePlayer } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const songs = [
  { id: 1, title: "Dekha Ek Khawb", artist: "Amitabh Bachchan, Kishore Kumar, Lata Mangeshkar", category: "90s", image: "/images/90s1.jpg", audio: "/songs/90s1.mp3" },
   { id: 2, title: "Dil Toh Pagal Hai", artist: "Lata Mangeshkar, Udit Narayan", category: "90s", image: "/images/90s2.jpg", audio: "/songs/90s2.mp3" },
    { id: 3, title: "O Palanhaare", artist: "Lata Mangeshkar", category: "90s", image: "/images/90s3.jpg", audio: "/songs/90s3.mp3" },
     { id: 4, title: "Kuch Kuch Hota Hai", artist: " Udit Narayan, Alka Yagnik, Jatin-Lalit", category: "90s", image: "/images/90s4.jpg", audio: "/songs/90s4.mp3" },
      { id: 5, title: "Aaye Ho Meri Zindagi Mein", artist: "Udit Narayan", category: "90s", image: "/images/90s5.jpg", audio: "/songs/90s5.mp3" },
       { id: 6, title: "O Mere Dil Ki Chain", artist: "Kishore Kumar", category: "90s", image: "/images/90s6.jpg", audio: "/songs/90s6.mp3" },
  
  { id: 7, title: "Saiyaara", artist: "Faheem Abdullah, Irshad Kamil, Arslan Nizami", category: "Trending", image: "/images/trending1.jpg", audio: "/songs/trending1.mp3" },
   { id: 8, title: "Qayde Se", artist: "Arijit Singh", category: "Trending", image: "/images/trending2.jpg", audio: "/songs/trending2.mp3" },
    { id: 9, title: "Dil Ka Jo Haal Hai", artist: " RAJEEV BARNWAL, Lalit Pandit, Abhijeet Bhattacharya, Shreya Ghoshal", category: "Trending", image: "/images/trending3.jpg", audio: "/songs/trending3.mp3" },
     { id: 10, title: "Sahiba", artist: " Aditya Rikhari", category: "Trending", image: "/images/trending4.jpg", audio: "/songs/trending4.mp3" },
      { id: 11, title: "Thodisi Daru", artist: "AP Dhillon, Shreya Ghoshal", category: "Trending", image: "/images/trending5.jpg", audio: "/songs/trending5.mp3" },
       { id: 12, title: "Avaan Javaan", artist: "Nikhita Gandhi, Arijit Singh, Amitabh Bhattacharya, Pritam Chakraborty", category: "Trending", image: "/images/trending6.jpg", audio: "/songs/trending6.mp3" },

  { id: 13, title: "Butter", artist: "BTS", category: "K-Pop", image: "/images/kpop1.jpg", audio: "/songs/kpop1.mp3" },
    { id: 14, title: "What It Sounds Like", artist: "Audrey Nuna, HUNTR/X, Ejae, Rei Ami, KPop Demon Hunters Cast", category: "K-Pop", image: "/images/kpop2.jpg", audio: "/songs/kpop2.mp3" },
      { id: 15, title: "TakeDown", artist: "Ejae, Audrey Nuna, and Rei Ami", category: "K-Pop", image: "/images/kpop3.jpg", audio: "/songs/kpop3.mp3" },
        { id: 16, title: "Dynamite", artist: "BTS", category: "K-Pop", image: "/images/kpop4.jpg", audio: "/songs/kpop4.mp3" },

  { id: 17, title: "Achutam Keshavam",  category: "Devotional", image: "/images/devotional1.jpg", audio: "/songs/devotional1.mp3" },
    { id: 18, title: "Aarigiri Nandini", category: "Devotional", image: "/images/devotional2.jpg", audio: "/songs/devotional2.mp3" },
      { id: 19, title: "Shri Krishna Govind Hare Murari", artist: "Jubin Nautiyal", category: "Devotional", image: "/images/devotional3.jpg", audio: "/songs/devotional3.mp3" },
        { id: 20, title: "Shiv Tandav Stotram", category: "Devotional", image: "/images/devotional4.jpg", audio: "/songs/devotional4.mp3" },


];


const FESTIVALS = [
  { name: "Navratri", image: "/images/navratribg.jpg" },
  { name: "Holi", image: "/images/holibg.jpg" },
  { name: "Ganpati", image: "/images/ganpatibg.jpg" },
];

const WALLPAPER_URL = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1950&q=80";


export default function Home() {
  const { likedSongs, toggleLike } = useLikedSongs();
  const { query } = useSearch();
  const { playSong } = usePlayer(); 
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    document.body.classList.add("scrollbar-hide");
    return () => document.body.classList.remove("scrollbar-hide");
  }, []);

  const openSongPopup = (song) => setSelectedSong(song);
  const closeSongPopup = () => setSelectedSong(null);

  
  const filteredSongs = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      (s.artist && s.artist.toLowerCase().includes(query.toLowerCase())) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const categories = ["90s", "Trending", "K-Pop", "Devotional"];

  return (
    <main className="max-w-6xl mx-auto px-4 pb-32">
      
      <motion.div
        className="relative w-full h-64 rounded-b-2xl shadow-xl overflow-hidden mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={WALLPAPER_URL} alt="Wallpaper" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-5xl font-bold text-white">My Music App</h1>
          <p className="text-gray-200 mt-2 text-lg">
           “Your ultimate music companion – stream, discover, and enjoy your {filteredSongs.length} favorite songs anytime, anywhere.” 
          </p>
        </div>
      </motion.div>

      
      {categories.map((section) => {
        const sectionSongs = filteredSongs.filter((s) => s.category === section);
        if (!sectionSongs.length) return null;
        return (
          <div key={section} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{section} Songs</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sectionSongs.map((s, index) => (
                <SongCard
                  key={s.id}
                  index={index}
                  song={s}
                  onPlay={() => playSong(s, sectionSongs)}
                  likedSongs={likedSongs}
                  toggleLike={toggleLike}
                  onOpen={() => openSongPopup(s)}
                />
              ))}
            </div>
          </div>
        );
      })}

      
      <FestivalSection likedSongs={likedSongs} toggleLike={toggleLike} />

      
      <SongPopup
        selected={selectedSong}
        onClose={closeSongPopup}
        onPlay={(song) => playSong(song, filteredSongs)}
        likedSongs={likedSongs}
        toggleLike={toggleLike}
      />
    </main>
  );
}


function SongCard({ song, index = 0, onPlay, likedSongs, toggleLike }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, delay: index * 0.06 }}
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
      onClick={onPlay}
    >
      <div className="relative w-full h-52">
        <img src={song.image} alt={song.title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
          <h3 className="text-white font-semibold truncate">{song.title}</h3>
          <p className="text-gray-300 text-sm truncate">{song.artist}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/70 transition"
        >
          {likedSongs.includes(song.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-white" />}
        </button>
      </div>
    </motion.div>
  );
}


function FestivalSection({ likedSongs, toggleLike }) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Festival Specials</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {FESTIVALS.map((festival) => (
          <div
            key={festival.name}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={festival.image}
              alt={festival.name}
              className="w-full h-52 object-cover"
              onClick={() => navigate(`/festival/${festival.name.toLowerCase()}`)}
            />
            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between px-3">
              <h3 className="text-white font-semibold truncate">{festival.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function SongPopup({ selected, onClose, onPlay, likedSongs, toggleLike }) {
  if (!selected) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.36, ease: "easeOut" }}
          className="bg-zinc-900 rounded-2xl shadow-xl p-5 w-[94%] max-w-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              <img src={selected.image} alt={selected.title} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="text-white text-lg font-bold">{selected.title}</h3>
                <p className="text-gray-400 text-sm">{selected.artist}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white"><FaTimes /></button>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={() => onPlay(selected)} className="flex-1 py-2 rounded-lg bg-zinc-800 text-white">Play</button>
            <button onClick={() => toggleLike(selected.id)} className="py-2 px-4 rounded-lg bg-spotifyGreen text-black font-bold">
              {likedSongs.includes(selected.id) ? "Unlike" : "Like"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}