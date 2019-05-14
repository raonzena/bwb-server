const express = require('express');
const router = express.Router();
const controllers = require('../controllers/login');

router.post('/login', controllers.loginController);
// router.post('/classes/messages', controllers.postMessageController);

module.exports = router;