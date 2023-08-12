const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const axios = require("axios");
const geolib = require("geolib");

exports.getCoordinates = catchAsyncErrors(async (req, res, next) => {
    const { currentLocation,pickupLocation } = req.body;
    const current = await axios.get(`http://nominatim.openstreetmap.org/search?format=json&q=${currentLocation}`);
    const pickup = await axios.get(`http://nominatim.openstreetmap.org/search?format=json&q=${pickupLocation}`);
    
    console.log(current.data[0]);
    console.log(pickup.data[0]);
    const currentCoords = current.data[0];
    const pickupCoords = pickup.data[0];

    const numberOfPoints = 5;

    const interpolatedCoords = [];

    for (let i = 0; i <= numberOfPoints; i++) {
        const latitude = currentCoords.lat + ((pickupCoords.lat - currentCoords.lat) / numberOfPoints) * i;
        const longitude = currentCoords.lon + ((pickupCoords.lon - currentCoords.lon) / numberOfPoints) * i;
        console.log(`Interpolated point ${i}: Lat ${latitude}, Lon ${longitude}`);
        interpolatedCoords.push({ latitude, longitude });
    }

    const jsonCoordinates = JSON.stringify(interpolatedCoords, null, 2);
    console.log(jsonCoordinates);
})

