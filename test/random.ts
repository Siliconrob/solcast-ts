import { LatLng } from '../src/types/latlng';

function randomNumber(min: number, max: number) : number {
  if (min > max) {
    throw new Error(`${min} > ${max}`);
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.random() * (max - min) + min;
}

export function position() : LatLng {
  const result:LatLng = {
    latitude: randomNumber(-43.6345972634, -10.6681857235), // Australia min/max
    longitude: randomNumber(113.338953078, 153.569469029) // Australia min/max
  };
  return result;
}