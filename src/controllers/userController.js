const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const axios = require("axios");


exports.getCoordinates = catchAsyncErrors(async (req, res, next) => {
    const { currentLocation,pickupLocation } = req.params;
    const apiKey ='5b3ce3597851110001cf624858cef959b1ba472bb282fd0206edc847';
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentLocation}&end=${pickupLocation}`;

    try {
        const response = await axios.get(url);
        const steps = response.data.features[0].geometry.coordinates;
        res.status(200).send(steps.map(coord => ({
            lat: coord[1],
            lng: coord[0]
        })));
    } catch (error) {
        console.error('Error fetching route:', error);
    }
})

