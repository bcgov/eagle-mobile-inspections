import utmObj from 'utm-latlng';

export function getCoordStamp(geo) {
  // Saved images store their geo data as an array. Images coming from the camera
  // store their geo data as an object.
  let lat;
  let lon;
  if (Array.isArray(geo)) {
    lat = geo[0];
    lon = geo[1];
  }
  else if (typeof geo === 'object' && geo !== null) {
    lat = geo.latitude;
    lon = geo.longitude;
  } else {
    lat = 0.0;
    lon = 0.0;
  }

  let utmWorker = new utmObj();
  // lat, lon, precision=1m
  let utmCoords = utmWorker.convertLatLngToUtm(lat, lon, 2);
  console.log(utmCoords)
  if (!utmCoords) {
    console.log("error converting coordinates to utm")
    return { "Easting": 0, "Northing": 0, "ZoneNumber": 999, "ZoneLetter": "ZZ" }
  }
  return utmCoords;
}