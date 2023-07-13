const songs = require('./songs');
const { nanoid } = require('nanoid');
const AppError = require('./AppError');

const getAllSongs = (req, res) => {
  res
    .json({
      message: 'success',
      data: songs,
    })
    .status(200);
};

const addSongs = (req, res) => {
  const { title, artist, url } = req.body;
  const newSong = {
    id: nanoid(),
    title: title,
    artist: artist,
    url: url,
  };
  songs.push(newSong);

  if (!title) throw new AppError('No Title', 400);
  if (!artist) throw new AppError('No artist', 400);
  if (!url) throw new AppError('No url', 400);

  res
    .json({
      status: 'success',
      data: newSong,
    })
    .status(201);
};

const playSong = (req, res) => {
  const findSong = songs.filter((song) => {
    return song.title.toLowerCase().includes(req.query.title.toLowerCase());
  });

  if (findSong.length === 0) throw new AppError('No Song Found', 404);

  res.json({
    status: 'success',
    data: findSong,
  });
};

module.exports = { getAllSongs, addSongs, playSong };
