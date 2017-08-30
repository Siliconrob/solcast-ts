import { LatLng } from '../src/types/latlng';

function randomNumber() : number {
  return 0;
}

export function position() : LatLng {
  const result:LatLng = {
    latitude: randomNumber(),
    longitude: randomNumber()
  };
  return result;
}