const Joi = require("joi");
const ResponseError = require("./responseError");

const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

const createDeviceValidation = Joi.object({
  device_id: Joi.string().required(),
  humidity: Joi.number().required(),
  temperature: Joi.number().required(),
  timestamp: Joi.string().isoDate().required(),
});

const getDeviceValidation = Joi.object({
  start: Joi.string().isoDate().required(),
  end: Joi.string().isoDate().required(),
  device_id: Joi.string().required(),
});

module.exports = { validate, createDeviceValidation,  getDeviceValidation };
