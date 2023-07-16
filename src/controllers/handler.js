const {
  getAllSongsService,
  getSongsByMostPlayedService,
  addSongsService,
  playSongByTitleService,
  getSongsByTitleService,
} = require('../usecases/service');
const AppError = require('./AppError');

const getAllSongs = (req, res) => {
  const { title } = req.query;

  if (title) {
    const theSong = getSongsByTitleService(title);

    if (theSong.length === 0) throw new AppError('Song not found', 404);

    res
      .json({
        status: 'success',
        data: theSong,
      })
      .status(200);
  } else {
    const allSong = getAllSongsService();

    if (allSong.length === 0)
      throw AppError('There is no song in your playlist', 404);

    res
      .json({
        status: 'success',
        data: allSong,
      })
      .status(200);
  }
};

const getSongsByMostPlayed = (req, res) => {
  const allSong = getSongsByMostPlayedService();

  if (allSong.length === 0)
    throw AppError('There is no song in your playlist', 404);

  res
    .json({
      status: 'success',
      data: allSong,
    })
    .status(200);
};

const addNewSong = (req, res) => {
  const { title, artist, url } = req.body;

  if (!title || !artist || !url)
    throw AppError('There is something missing, Please check your input', 400);

  const message = addSongsService(title, artist, url);

  res
    .json({
      status: 'success',
      message: message,
    })
    .status(201);
};

const playSongByTitle = (req, res) => {
  const { title } = req.query;
  const playedSong = playSongByTitleService(title);

  if (!playedSong[0]) throw new AppError('Song not found', 404);

  res
    .json({
      status: 'success',
      message: `${playedSong[0].title} by ${playedSong[0].artist} is playing`,
    })
    .status(200);
};

module.exports = {
  getAllSongs,
  getSongsByMostPlayed,
  playSongByTitle,
  addNewSong,
};
