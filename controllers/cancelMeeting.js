const users = require('../models').users;
const members = require('../models').members;
const jwt = require('jsonwebtoken');
const authorized = require('../modules/tokenUtil').authorized;
const verifyOptions = require('../modules/tokenUtil').verifyOptions;

const cancelMeetingController = function (req, res) {
    let token = req.headers.authorization;
    if (token === undefined || !authorized(token)) {
        res.sendStatus(405);
    } else {
        let legit = jwt.verify(token, 'bwb12', verifyOptions);
        let data = req.body;
        users.findOne({
            attributes: ['id'],
            where: {
                userId: legit.data
            }
        }).then(userResult => {
            members
                .destroy({
                    where: {
                        meeting_id: data.meetingId,
                        members_id: userResult.dataValues.id
                    }
                })
                .then(result =>
                    res.status(201).send('success')
                )
        })
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    }
}

module.exports = { cancelMeetingController };
