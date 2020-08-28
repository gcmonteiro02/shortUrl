const Joi = require("joi");

const userSchema = {
  create: Joi.object().keys({
    id: Joi.string().required(),
  }),
  paramId: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  urlCrate:Joi.object().keys({
    url: Joi.string().required()
  }),
};

module.exports = userSchema;
