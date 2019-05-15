const meetings = require('../models').meetings;
const restaurants = require('../models').restaurants;
const users = require('../models').users;
const jwt = require('jsonwebtoken');

const verifyOptions = {
    expiresIn: "7d",
    algorithm: "RS256"
}
//토큰 유효성 검사
const authorized = function (token) {
    let legit = jwt.verify(token, 'bwb12', verifyOptions);
    if (legit.isLogin) {
        return true;
    } else {
        return false;
    }
}

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
                            .then(result => {
                                res.status(200).json({ meetingId: result.id });
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