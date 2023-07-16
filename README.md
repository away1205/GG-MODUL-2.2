# Spotify Clone Server Documentation

This documentation provides a comprehensive overview of the code structure, functionality, and components of the Spotify clone server. It covers the purpose of each file, the available API endpoints, the data flow between different components, and the underlying logic. Use this documentation as a reference to understand and interact with the server.

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Code Structure](#code-structure)
    - [App Folder](#app-folder)
    - [Controllers Folder](#controllers-folder)
    - [Entities Folder](#entities-folder)
    - [Routes Folder](#routes-folder)
    - [Usecases Folder](#usecases-folder)
4. [API Endpoints](#api-endpoints)
5. [Controllers](#controllers)
6. [Entities](#entities)
7. [Routes](#routes)
8. [Usecases](#usecases)

## Introduction <a name="introduction"></a>

The Spotify clone server is a backend implementation that mimics some of the functionality of the Spotify service. It provides API endpoints for managing songs in a playlist-like structure. The server is built using Node.js and utilizes the Express.js framework for handling HTTP requests. The codebase follows a modular architecture to enhance code organization, maintainability, and reusability.

## Installation <a name="installation"></a>

To set up and run the Spotify clone server, follow these steps:

1. Clone the repository from GitHub:
   ```
   $ git clone <repository-url>
   ```

2. Install the required dependencies by navigating to the project directory and running the following command:
   ```
   $ npm install
   ```

3. Start the server by executing the following command:
   ```
   $ npm start
   ```

By default, the server runs on port 3000. You can modify the port number in the `app/rest.js` file.

## Code Structure <a name="code-structure"></a>

The Spotify clone server codebase follows a modular structure, organized into several folders:

### App Folder <a name="app-folder"></a>

The `app` folder contains the main file responsible for server configuration and startup:

- `rest.js`: This file initializes the Express.js server, sets up middleware, defines routes, and starts the server on the specified port. It uses the `routesExpress` module to handle the defined routes.

### Controllers Folder <a name="controllers-folder"></a>

The `controllers` folder contains files responsible for handling specific API endpoints and processing incoming requests:

- `AppError.js`: This file defines the `AppError` class, which extends the JavaScript `Error` class and is used for custom error handling. It takes a message and a status code as parameters.
- `handler.js`: This file exports several functions that act as request handlers for different API endpoints. These handlers receive incoming requests, process data, and send the appropriate responses. The available functions include:
  - `getAllSongs`: Retrieves all songs from the playlist. It supports an optional query parameter, `title`, to filter songs based on the title.
  - `getSongsByMostPlayed`: Retrieves songs from the playlist, sorted by the number of times they have been played.
  - `addNewSong`: Adds a new song to the playlist.
  - `playSongByTitle`: Plays a song from the playlist based on the provided title.

### Entities Folder <a name="entities-folder"></a>

The `entities` folder contains files related to data models and operations on the playlist:

- `songModel.js`: This file defines the `Song` class, which represents a song in the playlist. Each song has properties such as `id`, `title`, `artist`, `url`, and `playCount`. Additionally, the file includes functions to perform operations on the playlist:
  - `addNewSong`: Adds a new song to the playlist.
  - `getAllSongs`: Retrieves all songs from the playlist.
  - `getSongsByTitle`: Retrieves songs from the playlist based on a provided query.
  - `getSongsByMostPlayed`: Retrieves songs from the playlist, sorted by the number of times they have been played.
  - `playSongByTitle`: Plays a song from the playlist based on the provided title.

### Routes Folder <a name="routes-folder"></a>

The `routes` folder contains files responsible for defining the API endpoints and associating them with the appropriate route handlers:

- `routesExpress.js`: This file defines the Express router and configures the available routes. It imports the route handlers from the `controllers/handler.js` file and associates them with specific HTTP methods and URL paths.

### Usecases Folder <a name="usecases-folder"></a>

The `usecases` folder contains files that provide service functions responsible for interacting with the entities and performing specific operations:

- `service.js`: This file exports several service functions that abstract the underlying logic of the server's functionality. These functions utilize the operations defined in the `entities/songModel.js` file. The available service functions include:
  - `getAllSongsService`: Retrieves all songs from the playlist.
  - `getSongsByMostPlayedService`: Retrieves songs from the playlist, sorted by the number of times they have been played.
  - `getSongsByTitleService`: Retrieves songs from the playlist based on a provided title.
  - `addSongsService`: Adds a new song to the playlist.
  - `playSongByTitleService`: Plays a song from the playlist based on the provided title.

## API Endpoints <a name="api-endpoints"></a>

The Spotify clone server provides the following API endpoints:

### GET `/` - Retrieve all songs

Retrieves all the songs in the playlist. It supports an optional query parameter, `title`, to filter songs based on the title.

**Example Request:**
```
GET /?title=summer
```

**Example Response:**
```
Status: 200 OK
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "title": "Cruel Summer",
      "artist": "Taylor Swift",
      "url": "https://open.spotify.com/intl-id/track/1BxfuPKGuaTgP7aM0Bbdwr",
      "playCount": 0
    }
  ]
}
```

### GET `/mostplayed` - Retrieve songs by most played

Retrieves songs from the playlist, sorted by the number of times they have been played.

**Example Request:**
```
GET /mostplayed
```

**Example Response:**
```
Status: 200 OK
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "title": "Cruel Summer",
      "artist": "Taylor Swift",
      "url": "https://open.spotify.com/intl-id/track/1BxfuPKGuaTgP7aM0Bbdwr",
      "playCount": 0
    }
  ]
}
```

### GET `/playsong` - Play a song by title

Plays a song from the playlist based on the provided title.

**Query Parameters:**
- `title`: The title of the song to be played.

**Example Request

:**
```
GET /playsong?title=cruel%20summer
```

**Example Response:**
```
Status: 200 OK
{
  "status": "success",
  "message": "Cruel Summer by Taylor Swift is playing"
}
```

### POST `/addsong` - Add a new song

Adds a new song to the playlist.

**Request Body:**
- `title`: The title of the song.
- `artist`: The artist of the song.
- `url`: The URL of the song.

**Example Request:**
```
POST /addsong
Content-Type: application/json

{
  "title": "New Song",
  "artist": "New Artist",
  "url": "https://example.com/new-song"
}
```

**Example Response:**
```
Status: 201 Created
{
  "status": "success",
  "message": "New Song is now on your playlist"
}
```

## Controllers <a name="controllers"></a>

The controllers handle the logic for each API endpoint. They receive the incoming requests, process the data, and send the appropriate responses.

### `AppError` (controllers/AppError.js)

The `AppError` class represents an error object used for custom error handling. It extends the JavaScript `Error` class and includes additional properties such as the error message and status code.

### `handler.js`

This file contains the request handlers for each API endpoint. It exports the following functions:

- `getAllSongs(req, res)`: Retrieves all songs in the playlist. Optionally filters the songs by title.
- `getSongsByMostPlayed(req, res)`: Retrieves songs from the playlist, sorted by the number of times they have been played.
- `addNewSong(req, res)`: Adds a new song to the playlist.
- `playSongByTitle(req, res)`: Plays a song from the playlist based on the provided title.

## Entities <a name="entities"></a>

The entities represent the data models and related operations used in the Spotify clone server.

### `songModel.js`

The `Song` class represents a song object in the playlist. It includes properties such as `id`, `title`, `artist`, `url`, and `playCount`. Additionally, the file includes functions to perform operations on the playlist:

- `addNewSong(title, artist, url)`: Adds a new song to the playlist.
- `getAllSongs()`: Retrieves all songs in the playlist.
- `getSongsByTitle(query)`: Retrieves songs from the playlist based on the provided query.
- `getSongsByMostPlayed()`: Retrieves songs from the playlist, sorted by the number of times they have been played.
- `playSongByTitle(query)`: Plays a song from the playlist based on the provided title.

## Routes <a name="routes"></a>

The routes define the URL paths and route handlers for each API endpoint.

### `routesExpress.js`

This file defines the Express router and associates the API endpoints with their corresponding route handlers. It imports the route handlers from the `controllers/handler.js` file and associates them with specific HTTP methods and URL paths.

## Usecases <a name="usecases"></a>

The usecases folder contains service functions that interact with the entities to perform specific operations.

### `service.js`

The `service.js` file exports the following service functions:

- `getAllSongsService()`: Retrieves all songs in the playlist using the `getAllSongs()` function from the `entities/songModel.js` file.
- `getSongsByMostPlayedService()`: Retrieves songs from the playlist, sorted by the number of times they have been played using the `getSongsByMostPlayed()` function from the `entities/songModel.js` file.
- `getSongsByTitleService(title)`: Retrieves songs from the playlist based on the provided title using the `getSongsByTitle(title)` function from the `entities/songModel.js` file.
- `addSongsService(title, artist, url)`: Adds a new song to the playlist using the `addNewSong(title, artist, url)` function from the `entities/songModel.js` file.
- `playSongByTitleService(query)`: Plays a song from the playlist based on the provided title using the `playSongByTitle(query)` function from the `entities/songModel.js` file.

---
