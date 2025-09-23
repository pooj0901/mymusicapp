import React from "react";
import { usePlaylist } from "../context/PlaylistContext";
import SongCard from "../components/SongCard";
import { usePlayer } from "../context/PlayerContext";
import { useLikedSongs } from "../context/LikedSongsContext";

export default function PlaylistsPage() {
  const { playlists, removeSongFromPlaylist } = usePlaylist();
  const { playSong } = usePlayer();
  const { likedSongs, toggleLike } = useLikedSongs();

  return (
    <main className="max-w-6xl mx-auto px-4 pb-32">
      <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>

      {playlists.length === 0 ? (
        <p className="text-gray-400">
          No playlists yet. Create one from a song card!
        </p>
      ) : (
        playlists.map((pl) => (
          <div key={pl.id} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{pl.name}</h2>
            {pl.songs.length === 0 ? (
              <p className="text-gray-500">No songs in this playlist yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pl.songs.map((song, i) => (
                  <SongCard
                    key={song.id + "-" + i}
                    index={i}
                    song={song}
                    playSong={playSong}
                    likedSongs={likedSongs}
                    toggleLike={toggleLike}
                    removeFromPlaylist={() =>
                      removeSongFromPlaylist(pl.id, song.id)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </main>
  );
}
