const meetings = require('../models').meetings;
const users = require('../models').users;
const members = require('../models').members;
const jwt = require('jsonwebtoken');
const authorized = require('../modules/tokenUtil').authorized;
const verifyOptions = require('../modules/tokenUtil').verifyOptions;


const newMemberController = function (req, res) {
    let token = req.headers.authorization;
    if (token === undefined || !authorized(token)) {
        res.sendStatus(405);
    } else {
        let legit = jwt.verify(token, 'bwb12', verifyOptions);
        let data = req.body;
        users
            .findOne({
                where: {
                    userId: legit.data
                }
            })
            .then(userResult => {
                meetings
                    .findOne({
                        where: {
                            id: data.meetingId
                        }
                    })
                    .then(meetingResult => {
                        members
                            .findOne({
                                where: {
                                    meeting_id: meetingResult.dataValues.id,
                                    members_id: userResult.dataValues.id
                                }
                            })
                            .then(memberResult => {
                                if (memberResult) {
                                    res.sendStatus(409);
                                } else {
                                    members
                                        .create({
                                            meeting_id: meetingResult.dataValues.id,
                                            members_id: userResult.dataValues.id
                                        })
                                        .then(result => {
                                            res.status(201).send('success');
                                        })
                                }
                            })
                    })

            })
    }
}

module.exports = { newMemberController };
