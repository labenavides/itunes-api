const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const searchTracks = catchAsync(async (req, res) => {
  const result = await userService.searchTracks(req.query.name);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Band not found');
  }
  res.send(result);
});

const favorites = catchAsync(async (req, res) => {
  await userService.markAsFavorites(req.body);
  res.status(httpStatus.CREATED).send();
});

module.exports = {
  searchTracks,
  favorites,
};
