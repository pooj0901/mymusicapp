import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaPlay, FaPause, FaStepForward, FaStepBackward, FaDownload } from "react-icons/fa";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";

export default function Player() {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious, audioRef } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();
  const [progress, setProgress] = useState(0);

  if (!currentSong) return null;

  const isLiked = likedSongs.some(s => s.id === currentSong.id);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", playNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", playNext);
    };
  }, [audioRef, playNext]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentSong.audio;
    link.download = `${currentSong.title}.mp3`;
    link.click();
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-zinc-900 bg-opacity-95 backdrop-blur-md p-4 flex items-center gap-4 z-50">

      <img
        src={currentSong.image || currentSong.cover || "/default-cover.jpg"} 
        alt={currentSong.title}
        className="w-16 h-16 object-cover rounded-md"
      />

 
      <div className="flex-1 flex flex-col justify-center overflow-hidden">
        <p className="text-white font-semibold truncate">{currentSong.title || "Unknown Title"}</p>
        <p className="text-gray-400 text-sm truncate">{currentSong.artist || "Unknown Artist"}</p>

       
        <div className="h-1 w-full bg-gray-700 rounded mt-1 overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

     
      <div className="flex items-center gap-3 text-white text-lg">
        <button onClick={() => toggleLike(currentSong)}>{isLiked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}</button>
        <button onClick={playPrevious}><FaStepBackward /></button>
        <button onClick={togglePlay} className="bg-green-500 text-black p-2 rounded-full hover:scale-105 transition">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={playNext}><FaStepForward /></button>
        <button onClick={handleDownload}><FaDownload /></button>
      </div>
    </div>
  );
}
