const express = require('express');
const router = express.Router();
const signup = require('../controllers/signup');
const login = require('../controllers/login');
const meetingDetail = require('../controllers/meetingDetail');
const meetingDelete = require('../controllers/meetingDelete');
const newMeeting = require('../controllers/newMeeting');
const mypage = require('../controllers/mypage');
const newMember = require('../controllers/newMember');
const meetingLists = require('../controllers/meetingLists');
const logout = require('../controllers/logout');
const restaurantMeetingList = require('../controllers/restaurantMeetingList');

router.post('/signup', signup.postUserController);
router.post('/login', login.loginController);
router.get('/id/check', signup.idDuplicationCheckController);
router.get('/meetings/detail', meetingDetail.getMeetingDetailController);
router.post('/meetings/delete/meeting', meetingDelete.postMeetingDeleteController);
router.post('/meetings/new/meeting', newMeeting.newMeetingController);
router.post('/meetings/new/member', newMember.newMemberController);
router.get('/nickname/check', signup.nicknameDuplicationCheckController);
router.get('/mypage', mypage.getMyScheduleController);
router.get('/meetings/list/region', meetingLists.meetingListsController);
router.get('/logout', logout.logoutController);
router.get('/meetings/list/restaurant', restaurantMeetingList.restaurantMeetingListController);


router.get('/', (req, res) => {
   res.send('success');
});

module.exports = router;