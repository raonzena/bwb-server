const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');


router.post('/signup', signup.postUserController);
router.get('/idcheck', signup.idDuplicationCheckController);
router.post('/login', login.loginController);


router.get('/', (req, res) => {
   res.send('success');
});
module.exports = router;