
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { usePlayer } from "../context/PlayerContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Languages", path: "/languages" },
  { name: "Artists", path: "/artists" },
  { name: "Albums", path: "/albums" },
  { name: "Library", path: "/library" },
  { name: "Playlists", path: "/playlists" },
];

export default function Navbar() {
  const { query, setQuery, filteredSongs } = useSearch();
  const { playSong } = usePlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSongClick = (song) => {
    playSong(song, filteredSongs); 
    setQuery(""); 
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between relative">
      
        <div className="text-2xl font-bold text-spotifyGreen">My Music APP</div>

       
        <div className="hidden md:flex items-center gap-6 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-spotifyGreen font-semibold"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        
          <div className="relative">
            <input
              type="text"
              placeholder="Search songs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-4 py-1.5 rounded-full bg-gray-800 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-spotifyGreen w-40 md:w-64 transition-all"
            />
            <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />

          
            {query && filteredSongs.length > 0 && (
              <div className="absolute top-full mt-2 w-full max-h-72 overflow-y-auto bg-gray-900 border border-gray-700 rounded-xl shadow-lg z-50">
                {filteredSongs.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => handleSongClick(song)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-800 cursor-pointer"
                  >
                    <img
                      src={song.cover || song.image}
                      alt={song.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium truncate">{song.title}</p>
                      <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {query && filteredSongs.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 text-gray-400 text-center">
                No songs found.
              </div>
            )}
          </div>

       
          <div className="flex items-center gap-2 ml-4">
            <NavLink
              to="/login"
              className="px-4 py-1.5 border border-white/50 rounded-full text-white text-sm font-medium hover:border-white hover:text-white transition"
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-1.5 bg-spotifyGreen rounded-full text-black font-bold text-sm hover:bg-green-600 transition"
            >
              Sign Up
            </NavLink>
          </div>
        </div>

       
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-white text-xl" /> : <FaBars className="text-white text-xl" />}
          </button>
        </div>
      </div>

  
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-gray-900 overflow-hidden"
        >
          <div className="flex flex-col px-4 py-4 gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm transition-colors duration-200 ${
                    isActive ? "text-spotifyGreen font-semibold" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

          
            <div className="flex flex-col gap-2 mt-2">
              <NavLink
                to="/login"
                className="px-4 py-1.5 border border-white/50 rounded-full text-white text-sm font-medium hover:border-white hover:text-white transition"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-1.5 bg-spotifyGreen rounded-full text-black font-bold text-sm hover:bg-green-600 transition"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
