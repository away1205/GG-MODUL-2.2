const express = require('express');
const {
  getAllSongs,
  getSongsByMostPlayed,
  addNewSong,
  playSongByTitle,
} = require('../controllers/handler');

const router = express.Router();
router.get('/', getAllSongs);

router.get('/mostplayed', getSongsByMostPlayed);

router.get('/playsong', playSongByTitle);

router.post('/addsong', addNewSong);

module.exports = router;
