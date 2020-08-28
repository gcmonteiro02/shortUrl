const Joi = require("joi");

const urlSchema = {
  paramId: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = urlSchema;
