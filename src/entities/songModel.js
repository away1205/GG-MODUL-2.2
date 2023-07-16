const { nanoid } = require('nanoid');
const songs = require('./songs.json');

class Song {
  constructor(title, artist, url) {
    this.id = nanoid(9);
    this.title = title;
    this.artist = artist;
    this.url = url;
    this.playCount = 0;
  }
}

function addNewSong(title, artist, url) {
  const newSong = new Song(title, artist, url);

  songs.push(newSong);
}

function getAllSongs() {
  return songs;
}

function getSongsByMostPlayed() {
  return songs.sort((a, b) => {
    if (a.playCount > b.playCount) {
      return a > b ? 1 : -1;
    }
  });
}

function playSongByTitle(query) {
  const playedSong = songs.filter(
    (song) => song.title.toLowerCase() === query.toLowerCase()
  );

  if (playedSong[0]) playedSong[0].playCount++;

  return playedSong;
}

module.exports = {
  addNewSong,
  getAllSongs,
  playSongByTitle,
  getSongsByMostPlayed,
};
