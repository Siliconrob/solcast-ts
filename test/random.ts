import { LatLng } from '../src/types/latlng';

function randomNumber(min: number, max: number) : number {
  if (min > max) {
    throw new Error(`${min} > ${max}`);
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Number((Math.random() * (max - min) + min).toFixed(6));
}

export function invalidPosition() : LatLng {
  const ticks = (new Date()).getTime();
  const result:LatLng = {
    latitude: (ticks % 2 === 0) ? randomNumber(-110, -100) : randomNumber(100, 110),
    longitude: (ticks % 2 === 0) ? randomNumber(-200, -190) : randomNumber(190, 200)
  };
  return result;
}

export function position() : LatLng {
  const result:LatLng = {
    latitude: randomNumber(-43.634597, -10.668185), // Australia min/max
    longitude: randomNumber(113.338953, 153.569469) // Australia min/max
  };
  return result;
}