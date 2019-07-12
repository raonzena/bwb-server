const meetings = require('../models').meetings;
const members = require('../models').members;
const restaurants = require('../models').restaurants;
const users = require('../models').users;
const Sequelize = require('sequelize');
const verifyOptions = require('../modules/tokenUtil').verifyOptions;
const jwt = require('jsonwebtoken');
const authorized = require('../modules/tokenUtil').authorized;

const op = Sequelize.Op

const newMeeting = function (req, res) {
    let token = req.headers.authorization
    if (token === undefined || !authorized(token)) {
        res.sendStatus(405);
    } else {
        let legit = jwt.verify(token, 'bwb12', verifyOptions)
        let data = req.body;
        restaurants
            .findOrCreate({
                where: {
                    id: data.placeId
                }
            })
            .then(resResult => {
                users
                    .findOne({
                        where: {
                            userId: legit.data
                        }
                    })
                    .then(userResult => {
                        meetings
                            .create({
                                restaurant_id: resResult[0].dataValues.id,
                                name: data.meeting_name,
                                owner_id: userResult.dataValues.id,
                                time: data.time,
                                limit: data.limit
                            })
                            .then(meetingResult => {
                                console.log(meetingResult)
                                members
                                    .create({
                                        meeting_id: meetingResult.dataValues.id,
                                        members_id: userResult.dataValues.id
                                    })
                            })
                            .then(result => {
                                res.status(201).send('success');
                            })
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}

const meetingLists = (req, res) => {
    let data = req.body.restaurantInfos;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let minDate = new Date(year, month, date);
    let maxDate = new Date(year, month, date + 1);
    const isActive = (meetingTime) => {
        if (meetingTime.getTime() > now.getTime()) {
            return true;
        } else {
            return false;
        }
    }
    const findMeetings = async () => {
        let meetingResult = [];
        for (let i = 0; i < data.length; i++) {
            let aMeeting = await meetings.findAll({
                where: {
                    restaurant_id: data[i].place_id,
                    time: {
                        [op.gte]: minDate,
                        [op.lt]: maxDate
                    }
                }
            })
            if (aMeeting.length >= 1) {
                aMeeting.forEach(e => meetingResult.push(e))
            }
        }
        return meetingResult;
    }
    findMeetings()
        .then(meetingResult => {
            if (meetingResult.length === 0) {
                res.status(200).json({ result: [] })
            } else {
                const resultGen = async () => {
                    let result = [];
                    for (let i = 0; i < meetingResult.length; i++) {
                        console.log(meetingResult[i].dataValues)
                        let memberResult = await members
                            .findAndCountAll({
                                where: { meeting_id: meetingResult[i].dataValues.id }
                            })
                        let newResult = {};
                        newResult.placeId = meetingResult[i].dataValues.restaurant_id
                        newResult.meetingId = meetingResult[i].dataValues.id;
                        newResult.meetingName = meetingResult[i].dataValues.name;
                        newResult.meetingTime = meetingResult[i].dataValues.time;
                        newResult.numberOfMembers = memberResult.count;
                        newResult.limit = meetingResult[i].dataValues.limit;
                        newResult.isActive = isActive(meetingResult[i].dataValues.time);
                        result.push(newResult);
                    }
                    res.status(200).json({ result: result })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        })
                }
                resultGen();
            }
        })
};

const getMeetingDetail = function (req, res) {
    let userId;
    let token = req.headers.authorization;
    if (!token) {
        userId = null;
    } else {
        let legit = jwt.verify(token, 'bwb12', verifyOptions)
        userId = legit.data;
    }
    const { query } = req;

    members
        .findAll({
            include: [{
                model: meetings,
                where: { id: query.meetingId },
                include: { model: users }
            },
            {
                model: users
            }],
        })
        .then(results => {
            results = JSON.stringify(results);
            results = JSON.parse(results);
            results.push({ userId: userId })
            return results
        })
        .then(results => {
            res.status(200).json(results);

        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
};

const postMeetingDelete = function (req, res) {
    const { body } = req;
    members
        .count({
            where: { meeting_id: body.meetingId }
        })
        .then(result => {
            if (result === 1) {
                meetings
                    .destroy({
                        where: { id: body.meetingId }
                    })
                    .then(result => {
                        res.status(201).send('success');
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    })
            } else {
                res.status(400).send('delete failed');
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
};

module.exports = { 
  newMeeting,
  meetingLists,
  getMeetingDetail,
  postMeetingDelete
};