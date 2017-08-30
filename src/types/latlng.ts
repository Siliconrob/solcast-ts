import * as Joi from 'joi';

const schemas = {
    query: Joi.object({
        latitude: Joi.number().required().min(-90).max(90),
        longitude: Joi.number().required().min(-180).max(180)
    })
};

export interface LatLng {
  latitude: number;
  longitude: number;
}

export function validate(input: LatLng) : any {
  const result = Joi.validate(input, schemas);
  return result;
}