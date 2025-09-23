import React from "react";
import { useSearch } from "../context/SearchContext";
import SongCard from "../components/SongCard";
import songs from "../data/songs.json"; 

export default function Search() {
  const { query, setQuery } = useSearch();

 
  const results = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto px-4 pb-32">
      <h1 className="text-3xl font-bold my-6">Search</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-lg bg-white/10 mb-6"
        placeholder="Search songs or artists..."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((s) => (
          <SongCard key={s.id} song={s} />
        ))}
      </div>
    </main>
  );
}
