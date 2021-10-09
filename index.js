require('dotenv').config()
const express = require('express')
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
const app = express()

app.use(cors(
    { credentials: true }
))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 5000

const server = app.listen(port)

const redirect_url = `http://localhost:${port}/callback`

const spotifyApi = new SpotifyWebApi({
    clientId: "66f97b199c044136aa7dba69e44b4517",
    clientSecret: "bd8037ce06b44e47ae74a9622f2cc0a2",
    redirectUri: redirect_url,
    accessToken: process.env.ACCESS_TOKEN
})

// When our access token will expire
let tokenExpirationEpoch;

// First retrieve an access token
spotifyApi.authorizationCodeGrant(authorizationCode).then(
  function(data) {
    // Set the access token and refresh token
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);

    // Save the amount of seconds until the access token expired
    tokenExpirationEpoch =
      new Date().getTime() / 1000 + data.body['expires_in'];
    console.log(
      'Retrieved token. It expires in ' +
        Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
        ' seconds!'
    );
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving the access token!',
      err.message
    );
  }
);

// Continually print out the time left until the token expires..
let numberOfTimesUpdated = 0;

setInterval(function() {
  console.log(
    'Time left: ' +
      Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
      ' seconds left!'
  );

  // OK, we need to refresh the token. Stop printing and refresh.
  if (++numberOfTimesUpdated > 5) {
    clearInterval(this);

    // Refresh token and print the new time to expiration.
    spotifyApi.refreshAccessToken().then(
      function(data) {
        tokenExpirationEpoch =
          new Date().getTime() / 1000 + data.body['expires_in'];
        console.log(
          'Refreshed token. It now expires in ' +
            Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
            ' seconds!'
        );
      },
      function(err) {
        console.log('Could not refresh the token!', err.message);
      }
    );
  }
}, 1000);

app.get('/', (request, response) => {

    //return list of artists have name Taylor Swift order by popularity => get items[0] to get the most popularity
    spotifyApi.searchArtists('Taylor Swift').then(
        function(data) {
            console.log(data.body.artists.items[0])
        },
        function(err) {
          console.error(err);
        }
      );
})