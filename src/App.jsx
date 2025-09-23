import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import GlobalPlayer from "./components/GlobalPlayer";

import { PlayerProvider } from "./context/PlayerContext";
import { DownloadProvider } from "./context/DownloadContext";
import { PlaylistProvider } from "./context/PlaylistContext";
import { LikedSongsProvider } from "./context/LikedSongsContext";
import { SearchProvider } from "./context/SearchContext";

import Home from "./pages/Home";

import Languages from "./pages/Languages";
import LanguageSongs from "./pages/LanguageSongs";
import Library from "./pages/Library";
import Search from "./pages/Search";
import Artist from "./pages/Artist";
import ArtistDetails from "./pages/ArtistDetails";
import Album from "./pages/Album";
import AlbumDetails from "./pages/AlbumDetails";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails";
import FestivalPage from "./pages/FestivalPage";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";



function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="px-4 max-w-6xl mx-auto"
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <GoogleOAuthProvider clientId="12465586629-h56vr41jsvaqgjf8fmf687dlvdahlop6.apps.googleusercontent.com">
    <SearchProvider>
<PlayerProvider>
  <LikedSongsProvider>
    <DownloadProvider>
      <PlaylistProvider>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-1 overflow-y-auto pt-16">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
               
                <Route path="/languages" element={<PageWrapper><Languages /></PageWrapper>} />
                <Route path="/languages/:language" element={<LanguageSongs />} />
                <Route path="/search" element={<PageWrapper><Search /></PageWrapper>} />
                <Route path="/library" element={<PageWrapper><Library /></PageWrapper>} />
                <Route path="/artists" element={<PageWrapper><Artist /></PageWrapper>} />
                <Route path="/artist/:artistName" element={<PageWrapper><ArtistDetails /></PageWrapper>} />
                <Route path="/albums" element={<PageWrapper><Album /></PageWrapper>} />
                <Route path="/album/:albumName" element={<PageWrapper><AlbumDetails /></PageWrapper>} />
                <Route path="/playlists" element={<PageWrapper><Playlists /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
                <Route path="/festival/:festivalName" element={<FestivalPage />} />

                <Route path="/playlist/:playlistId" element={<PageWrapper><PlaylistDetails /></PageWrapper>} />
                <Route path="*" element={
                  <PageWrapper>
                    <h1 className="text-center mt-20 text-white text-2xl">404 - Page Not Found</h1>
                  </PageWrapper>
                } />
              </Routes>
            </AnimatePresence>
          </div>
          <GlobalPlayer />
        </div>
      </PlaylistProvider>
    </DownloadProvider>
  </LikedSongsProvider>
</PlayerProvider>
</SearchProvider>
</GoogleOAuthProvider>

  );
}

export default App;
