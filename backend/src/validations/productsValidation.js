import { Segments, Joi } from "celebrate";

export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).required(),
    quantity: Joi.number().min(0).integer().required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().allow(""),
  }),
};

export const editProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2),
    quantity: Joi.number().min(0).integer(),
    price: Joi.number().min(0),
    description: Joi.string().allow(""),
  }).min(1),

  [Segments.PARAMS]: Joi.object({
    id: Joi.number().positive().integer().required(),
  }),
};

export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().positive().integer().required(),
  }),
};
