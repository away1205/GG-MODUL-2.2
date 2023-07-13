const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const { getAllSongs, addSongs, playSong } = require('./src/handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', getAllSongs);

app.get('/play', playSong);

app.post('/add', addSongs);

app.use((req, res) => {
  get;
  res
    .json({
      status: 'Failed!',
      message: 'Page Not Found!',
    })
    .status(404);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something Went Wrong!' } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`App is Running in ${PORT}`);
});