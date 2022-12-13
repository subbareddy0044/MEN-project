const express = require('express');
const restarantController = require("../controles/Restaurant");
const router = express.Router();
router.post('/filterRestaurants',restarantController.filterRestaurants);

module.exports= router;