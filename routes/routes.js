const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const meetingDetail = require('../controllers/meetingDetail');
const meetingDelete = require('../controllers/meetingDelete');


router.post('/signup', signup.postUserController);
router.post('/login', login.loginController);
router.get('/idcheck', signup.idDuplicationCheckController);
router.get('/meetings/detail', meetingDetail.getMeetingDetailController);
router.post('/meetings/delete/meeting', meetingDelete.postMeetingDeleteController);


router.get('/', (req, res) => {
   res.send('success');
});
module.exports = router;