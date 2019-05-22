const meetings = require('../models').meetings;
const restaurants = require('../models').restaurants;
const users = require('../models').users;
const members = require('../models').members;
const jwt = require('jsonwebtoken');
const authorized = require('../modules/tokenUtil').authorized;
const verifyOptions = require('../modules/tokenUtil').verifyOptions;


const newMeetingController = function (req, res) {
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


module.exports = { newMeetingController };