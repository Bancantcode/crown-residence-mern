const Joi = require('joi');

const validateRegistrationData = (username, email, password) => {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate({ username, email, password });
};

module.exports = { validateRegistrationData };
