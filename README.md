## Spotify Playlist Server

The Spotify Playlist Server is a Node.js application that allows users to manage a playlist by adding songs, playing songs, and retrieving the list of songs. The server is built using Express.js framework and follows a RESTful API design.

### Prerequisites

Before running the server, ensure that you have Node.js and npm (Node Package Manager) installed on your machine.

### Installation

1. Clone the repository or download the source code.

2. Open a terminal and navigate to the project directory.

3. Install the required dependencies by running the following command:
   ```
   npm install
   ```

### `app.js`

The `app.js` file serves as the entry point for the Spotify Playlist Server. It sets up the Express.js server, defines the endpoints, and handles error scenarios.

#### Dependencies

- express: A fast and minimalist web framework for Node.js.

#### Installation

No additional installation steps are required for the `app.js` file. The necessary dependencies are installed during the overall project installation.

#### Usage

1. Start the server by running the following command:
   ```
   node app.js
   ```

2. The server will start running and listening on the specified port (either 3000 or the environment variable `PORT`).

3. Use an HTTP client (such as Postman or cURL) to interact with the server's endpoints.

#### Endpoints

The Spotify Playlist Server provides the following endpoints:

##### GET `/`

- Description: Retrieves all songs in the playlist.
- Method: GET
- URL: `/`
- Response Format: JSON
- Response Body Example:
  ```json
  {
    "message": "success",
    "data": [
      {
        "id": "4xaTadWJLjJt9QwDygAXGK",
        "title": "Song 1",
        "artist": "Artist 1",
        "url": "https://spotify.com/song1"
      },
      {
        "id": "3m0Z7vY7UuoDtVzgdMaW0g",
        "title": "Song 2",
        "artist": "Artist 2",
        "url": "https://spotify.com/song2"
      }
    ]
  }
  ```

##### GET `/play`

- Description: Plays a song from the playlist.
- Method: GET
- URL: `/play`
- Response Format: JSON
- Response Body Example:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "4xaTadWJLjJt9QwDygAXGK",
        "title": "Song 1",
        "artist": "Artist 1",
        "url": "https://spotify.com/song1"
      }
    ]
  }
  ```

##### POST `/add`

- Description: Adds a song to the playlist.
- Method: POST
- URL: `/add`
- Request Format: JSON
- Request Body Example:
  ```json
  {
    "title": "New Song",
    "artist": "Artist 3",
    "url": "https://spotify.com/newsong"
  }
  ```
- Response Format: JSON
- Response Body Example:
  ```json
  {
    "status": "success",
    "data": {
      "id": "yYnzEASoUGbEDCY11CvGx",
      "title": "New Song",
      "artist": "Artist 3",
      "url": "https://spotify.com/newsong"
    }
  }
  ```

#### Error Handling

- If a route is not found, the server responds with a 404 status code and a JSON error message:
  ```json
  {
    "status": "Failed!",
    "message": "Page Not Found!"
  }
  ```

- If an error occurs in the server, the error handling middleware captures it and sends an appropriate status code and error message:
  ```json
  {
    "status": 500,
    "message": "Something Went Wrong!"
  }
  ```

### `handler.js`

The `handler.js` file contains the handler functions responsible for processing requests related to managing the Spotify playlist.

#### Dependencies

- nanoid: A small utility library to generate unique IDs.
- AppError: A custom module for defining and handling application errors.

#### Installation

No additional installation steps are required for the `handler.js` file. The necessary dependencies are installed during the overall project installation.

#### Usage

The functions in `handler.js` are imported and used in the `app.js` file to handle specific endpoints.

#### Functions

##### `getAllSongs`

- Description: Retrieves all songs in the playlist.
- Parameters: None
- Returns: JSON response with the list of songs
- Response Format: JSON
- Response Body Example:
  ```json
  {
    "message": "success",
    "data": [
      {
        "id": "4xaTadWJLjJt9QwDygAXGK",
        "title": "Song 1",
        "artist": "Artist 1",
        "url": "https://spotify.com/song1"
      },
      {
        "id": "3m0Z7vY7UuoDtVzgdMaW0g",
        "title": "Song 2",
        "artist": "Artist 2",
        "url": "https://spotify.com/song2"
      }
    ]
  }
  ```

##### `addSongs`

- Description: Adds a song to the playlist.
- Parameters:
  - `req` (object): The request object containing the song details in the request body.
  - `res` (object): The response object to send the result.
- Returns: JSON response with the added song details
- Request Format: JSON
- Request Body Example:
  ```json
  {
    "title": "New Song",
    "artist": "Artist 3",
    "url": "https://spotify.com/newsong"
  }
  ```
- Response Format: JSON
- Response Body Example:
  ```json
  {
    "status": "success",
    "data": {
      "id": "yYnzEASoUGbEDCY11CvGx",
      "title": "New Song",
      "artist": "Artist 3",
      "url": "https://spotify.com/newsong"
    }
  }
  ```

##### `playSong`

- Description: Plays a song from the playlist based on the provided title.
- Parameters:
  - `req` (object): The request object containing the query parameter `title`.
  - `res` (object): The response object to send the result.
- Returns: JSON response with the matching song details
- Response Format: JSON
- Response Body Example:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": "4xaTadWJLjJt9QwDygAXGK",
        "title": "Song 1",
        "artist": "Artist 1",
        "url": "https://spotify.com/song1"
      }
    ]
  }
  ```

#### Error Handling

- In the `addSongs` function, input validation is performed to check if the required fields (`title`, `artist`, and `url`) are present. If any of these fields are missing, it throws an `AppError` with a status code of 400.

- In the `playSong` function, if no song is found in the playlist for the provided title, it throws an `AppError` with a status code of 404.

#### Exporting Functions

The handler functions are exported at the end of the file for use in other modules:

```javascript
module.exports = { getAllSongs, addSongs, playSong };
```

### Conclusion

The Spotify Playlist Server provides a simple API to manage a playlist. The `app.js` file sets up the server, defines the endpoints, and handles errors, while the `handler.js` file contains the implementation of the handler functions for each endpoint.
