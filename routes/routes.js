const express = require('express');
const router = express.Router();
const signup = require('./controllers');
// const controllers = require('./controllers');

router.post('/signup', signup.postUserController);
// router.get('/classes/messages', controllers.getMessageController);
// router.post('/classes/messages', controllers.postMessageController);

module.exports = router;