const httpStatus = require('http-status');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const { SearchResponseDto, BandDto, PrecioDto, FavoritoDto } = require('../dto/band.dto');
const config = require('../config/config');
const cache = require('../cache/redis');

const ITUNES_SEARCH = '/search';
const MAX_RESULTS = 25;

const ITUNES_CACHE_BASE_KEY = 'itunes';
const FAVORITES_CACHE_BASE_KEY = 'favorites';

const searchTracks = async (name) => {
  const itunesSearchUrl = `${config.itunesHostUrl}${ITUNES_SEARCH}`;
  const sanitizedName = name.replace(/\s+/g, '').toLowerCase();
  const itunesCacheKey = `${ITUNES_CACHE_BASE_KEY}:${sanitizedName}`;

  const responseFromCache = await cache.get(itunesCacheKey);
  if (responseFromCache) {
    return responseFromCache;
  }
  return resultsFromItunes(itunesSearchUrl, sanitizedName, itunesCacheKey);
};

const resultsFromItunes = async (itunesSearchUrl, sanitizedName, itunesCacheKey) => {
  let total_canciones = 0;

  const response = await axios.get(`${itunesSearchUrl}?term=${sanitizedName}`);

  const artistAlbums = new Map();

  if (response.data.resultCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'NO se encontraron Registros');
  }

  const cleanedResultsOfArtist = response.data.results
    .filter((result) => {
      return (
        result.wrapperType === 'track' &&
        result.kind === 'song' &&
        sanitizedName === result.artistName.replace(/\s+/g, '').toLowerCase()
      );
    })
    .slice(0, MAX_RESULTS)
    .map((result) => {
      artistAlbums.set(result.collectionName, result.collectionName);
      total_canciones++;
      return new BandDto(
        result.trackId,
        result.collectionName,
        result.trackName,
        result.previewUrl,
        result.releaseDate,
        new PrecioDto(result.collectionPrice, result.currency)
      );
    });
  const albums = Array.from(artistAlbums.keys());

  const searchResponse = new SearchResponseDto(albums.length, total_canciones, albums, cleanedResultsOfArtist);
  await cache.saveWithTtl(itunesCacheKey, searchResponse, 3);
  return searchResponse;
};

// TODO arreglar / cambiar lo que se guarda en el redis
// validar si cancion ya fue agregada
const markAsFavorites = async (favorite) => {
  const sanitizedUserName = favorite.usuario.toLowerCase();
  const favoritesCacheKey = `${favorite.cancion_id}:${favorite.nombre_banda}`;

  let cacheUserFavorites = await cache.get(favoritesCacheKey);

  if (!cacheUserFavorites) {
    cacheUserFavorites = new FavoritoDto();
  }
  if (cacheUserFavorites.favoritos?.length === 0) {
    cacheUserFavorites= favorite;
  }
  await cache.save(favoritesCacheKey, cacheUserFavorites);
};

module.exports = {
  searchTracks,
  markAsFavorites,
};
