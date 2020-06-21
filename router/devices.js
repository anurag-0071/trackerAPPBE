const router = require('express').Router();

const deviceController = require("../controllers/device.controller");

router.get('/fetch', deviceController.fetchDevices);

module.exports = router;