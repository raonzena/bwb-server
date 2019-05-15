const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const meetingDetail = require('../controllers/meetingDetail');
const meetingDelete = require('../controllers/meetingDelete');
const newMeeting = require('../controllers/newMeeting');
const newMember = require('../controllers/newMember');

router.post('/signup', signup.postUserController);
router.post('/login', login.loginController);
router.get('/id/check', signup.idDuplicationCheckController);
router.get('/meetings/detail', meetingDetail.getMeetingDetailController);
router.post('/meetings/delete/meeting', meetingDelete.postMeetingDeleteController);
router.post('/meetings/new/meeting', newMeeting.newMeetingController);
router.post('/meetings/new/member', newMember.newMemberController);
router.get('/nickname/check', signup.nicknameDuplicationCheckController);


router.get('/', (req, res) => {
   res.send('success');
});

module.exports = router;