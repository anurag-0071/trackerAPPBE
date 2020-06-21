const router = require('express').Router();

const statusController = require("../controllers/status.controller");

router.get('/', () => { console.log('got request') })
router.get('/fetch/:deviceId', statusController.fetchStatus);

module.exports = router;