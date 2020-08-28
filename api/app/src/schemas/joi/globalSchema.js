const Joi = require("joi");

const globalSchema = {
  paramId: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = globalSchema;
