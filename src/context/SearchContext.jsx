
import React, { createContext, useContext, useState } from "react";


const ALL_SONGS = [
 
  

];

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");


  const filteredSongs = ALL_SONGS.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SearchContext.Provider value={{ query, setQuery, filteredSongs }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
