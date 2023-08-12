const express = require('express');
const {getCoordinates}  = require('../controllers/userController');
const router = express.Router();

router.route("/latlng/list").get(getCoordinates);

module.exports = router;