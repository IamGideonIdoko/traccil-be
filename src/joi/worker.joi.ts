import Joi from 'joi';

export const registerWorkerInputSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),
  repeat_password: Joi.ref('password'),
  gender: Joi.string().valid('MALE', 'FEMALE'),
  address: Joi.string().min(3).max(150),
  country: Joi.string().min(3),
  phone: Joi.string().min(3),
  dob: Joi.string().min(3).max(160),
  bio: Joi.string().min(3).max(160),
  //   address: Joi.alternatives().try(Joi.string()),
  //   country: Joi.alternatives().try(Joi.string()),
  //   phone: Joi.alternatives().try(Joi.string()),
  //   dob: Joi.alternatives().try(Joi.string().max(160)),
  //   bio: Joi.alternatives().try(Joi.string().max(160)),
}).with('password', 'repeat_password');
