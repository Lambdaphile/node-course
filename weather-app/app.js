const request = require('request');

const url =
  'http://api.weatherstack.com/current?access_key=4cf1c7481125a399c11717f97fd7d8df&query=37.8267,-122.4233&units=f';

request({ url, json: true }, (error, response) => {
  console.log(response.body.current.weather_descriptions);
  console.log(
    `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`,
  );
});

const geocodeURL =
  'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZ2VuZXNpcy1hbGdvcml0aG1zIiwiYSI6ImNrbGd4YXNqbDJkZDYycHM4azY3NXVtZXUifQ.1j_VTiMt5nEIEtMGDxzLIQ&limit=1';

request({ url: geocodeURL, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];

  console.log(`Latitude: ${latitude} and Longitude: ${longitude}`);
});
