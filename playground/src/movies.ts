// Open movies for the playground, used for screenshots of the extension on real footage. They aren't committed:
// `pnpm playground:movies` downloads them into playground/public/movies (see playground/scripts/download-movies.ts).

export type Movie = {
  id: string;
  title: string;
  year: number;
  // Required next to anything published with the movie in it
  credit: string;
  creditUrl: string;
  videoSource: string;
  subtitles: { id: string; label: string; source: string }[];
};

// Wikimedia Commons keeps the original encode and subtitles timed to this exact file
const SPRITE_FRIGHT_FILE = "Sprite_Fright_-_Blender_Open_Movie-full_movie.webm";
const commonsSubtitles = (file: string, language: string) =>
  `https://commons.wikimedia.org/w/index.php?title=TimedText:${file}.${language}.srt&action=raw`;

export const MOVIES: Movie[] = [
  {
    id: "sprite-fright",
    title: "Sprite Fright",
    year: 2021,
    credit: "Sprite Fright © Blender Studio, CC BY 4.0",
    creditUrl: "https://studio.blender.org/films/sprite-fright/",
    videoSource: `https://upload.wikimedia.org/wikipedia/commons/7/76/${SPRITE_FRIGHT_FILE}`,
    subtitles: [
      { id: "en", label: "English", source: commonsSubtitles(SPRITE_FRIGHT_FILE, "en") },
      { id: "ru", label: "Русский", source: commonsSubtitles(SPRITE_FRIGHT_FILE, "ru") },
      { id: "es", label: "Español", source: commonsSubtitles(SPRITE_FRIGHT_FILE, "es") },
      { id: "de", label: "Deutsch", source: commonsSubtitles(SPRITE_FRIGHT_FILE, "de") },
    ],
  },
];

// Paths of the downloaded files, relative to playground/public
export const movieVideoPath = (movie: Movie) => `movies/${movie.id}/video.webm`;
export const movieSubtitlesPath = (movie: Movie, trackId: string) => `movies/${movie.id}/${trackId}.srt`;
