const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().min(4).required(),
  quantity: Joi.number().required(),
  category: Joi.string().min(3).required(),
  content: Joi.string().min(20).required(),
  price: Joi.number().required()
})

module.exports =  {
  createValidation
}