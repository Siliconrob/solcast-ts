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

export function validateInput(point : LatLng) : void {
  const parseResult = validate(point);
  if (parseResult.valid === false) {
      throw new Error(parseResult.error);
  }
}

function validate(input: LatLng) : ValidationResult {
  const result = Joi.validate(input, schemas.query);
  let response:ValidationResult = {
    valid: false,
    error: ''
  };
  if (result.error !== null) {
    response.error = result.error;
    return response;
  }
  response.valid = true;
  return response;
}

export interface ValidationResult {
  valid: boolean;
  error: string;
}