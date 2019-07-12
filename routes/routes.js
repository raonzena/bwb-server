const express = require('express');
const router = express.Router();
const SignupController = require('../controllers/SignupController');
const AuthController = require('../controllers/AuthController');
const MeetingController = require('../controllers/MeetingController');
const MeetingMemberController = require('../controllers/MeetingMemberController');
const MeetingRestaurantController = require('../controllers/MeetingRestaurantController');

router.post('/signup', SignupController.postUser);
router.get('/id/check', SignupController.idDuplicationCheck);
router.get('/nickname/check', SignupController.nicknameDuplicationCheck);

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/mypage', AuthController.getMySchedule);
router.get('/userNickname', AuthController.getNickname);

router.get('/meetings/detail', MeetingController.getMeetingDetail);
router.post('/meetings/delete/meeting', MeetingController.postMeetingDelete);
router.post('/meetings/new/meeting', MeetingController.newMeeting);
router.post('/meetings/list/region', MeetingController.meetingLists);

router.post('/meetings/new/member', MeetingMemberController.newMember);
router.post('/meetings/cancel/member', MeetingMemberController.cancelMember);

router.get('/meetings/list/restaurant', MeetingRestaurantController.restaurantMeetingList);


//TODO. 기능별 라우터 나누기
//컨트롤러 묶기 ex) userController => signup login.. 

router.get('/', (req, res) => {
   res.send('success');
});

module.exports = router;