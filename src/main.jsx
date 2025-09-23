import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LikedSongsProvider } from "./context/LikedSongsContext";
import { PlaybackProvider } from "./context/PlaybackContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LikedSongsProvider>
        <PlaybackProvider>
          <App />
        </PlaybackProvider>
      </LikedSongsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
