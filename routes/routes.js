const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const newMeeting = require('../controllers/newMeeting');
const newMember = require('../controllers/newMember');

router.post('/signup', signup.postUserController);
router.post('/login', login.loginController);
router.get('/idcheck', signup.idDuplicationCheckController);

router.post('/meetings/new/meeting', newMeeting.newMeetingController);
router.post('/meetings/new/member', newMember.newMemberController);


router.get('/', (req, res) => {
   res.send('success');
});

module.exports = router;