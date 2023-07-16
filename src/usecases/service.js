const {
  getAllSongs,
  getSongsByMostPlayed,
  addNewSong,
  playSongByTitle,
  getSongsByTitle,
} = require('../entities/songModel');

const getAllSongsService = () => {
  return getAllSongs();
};

const getSongsByMostPlayedService = () => {
  return getSongsByMostPlayed();
};

const getSongsByTitleService = (title) => {
  return getSongsByTitle(title);
};

const addSongsService = (title, artist, url) => {
  if (!title) throw new Error('What is the title?');
  if (!artist) throw new Error('Who is the artist?');
  if (!url) throw new Error('What is the URL?');

  addNewSong(title, artist, url);
  return `${title} is now on your playlist`;
};

const playSongByTitleService = (query) => {
  const playedSong = playSongByTitle(query);
  return playedSong;
};

module.exports = {
  getAllSongsService,
  getSongsByMostPlayedService,
  playSongByTitleService,
  addSongsService,
  getSongsByTitleService,
};
