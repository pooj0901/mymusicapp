import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const songsDir = path.join(__dirname, "public/songs");
const coversDir = path.join(__dirname, "public/covers");


function getCover(songFile) {
  const baseName = path.parse(songFile).name;
  const coverFile = `${baseName}.jpg`;
  if (fs.existsSync(path.join(coversDir, coverFile))) {
    return `/covers/${coverFile}`;
  }
  return ""; 
}

const files = fs.readdirSync(songsDir).filter(f => f.endsWith(".mp3"));

const songs = files.map((file, index) => ({
  id: index + 1,
  title: path.parse(file).name,
  artist: "Unknown", 
  album: "Unknown",
  language: "Unknown",
  audio: `/songs/${file}`,
  cover: getCover(file)
}));

fs.writeFileSync(
  path.join(__dirname, "src/data/songs.json"),
  JSON.stringify(songs, null, 2)
);

console.log("songs.json generated successfully!");
