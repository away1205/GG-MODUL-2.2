const {
  getAllSongs,
  getSongsByMostPlayed,
  addNewSong,
  playSongByTitle,
} = require('../entity/songModel');
const AppError = require('./AppError');

const getAllSongsService = () => {
  return getAllSongs();
};

const getSongsByMostPlayedService = () => {
  return getSongsByMostPlayed();
};

const addSongsService = (title, artist, url) => {
  if (!title) throw new AppError('What is the title?', 400);
  if (!artist) throw new AppError('Who is the artist?', 400);
  if (!url) throw new AppError('What is the URL?', 400);

  addNewSong(title, artist, url);
  return `${title} is now on your playlist`;
};

const playSongByTitleService = (query) => {
  const playedSong = playSongByTitle(query);

  if (!playedSong[0]) throw new AppError('Song not found', 404);

  return `${playedSong[0].title} by ${playedSong[0].artist} is playing`;
};

module.exports = {
  getAllSongsService,
  getSongsByMostPlayedService,
  playSongByTitleService,
  addSongsService,
};
