const Joi = require('joi');

const postFavorites = {
  body: Joi.object().keys({
    nombre_banda: Joi.string().required(),
    cancion_id: Joi.number().required(),
    usuario: Joi.string().required(),
    ranking: Joi.string().required(),
  }),
};

const searchByName = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};

module.exports = {
  postFavorites,
  searchByName,
};
