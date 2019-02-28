const express = require('express');
const router = express.Router();

const SpotifyWebApi = require('spotify-web-api-node');
const clientId = 'ff26ae16dd77474db7436ed469d0f5be';
const clientSecret = '52bb22edb5db414ab5983a9612a9fa6e';

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  });

/* GET home page. */
router.get('/', async (req, res, next) => {
  const { nameArtist } = req.query;
  try {
    const objectArtists = await spotifyApi.searchArtists(nameArtist);
    const arrayArtist = objectArtists.body.artists.items;
    console.log(arrayArtist[0].images[0]);
    res.render('artists', { arrayArtist });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
