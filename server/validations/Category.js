const Joi = require('joi');

const createValidation = Joi.object({
  name: Joi.string().min(4)
})

module.exports = {
  createValidation
}