const meetings = require('../models').meetings;
const users = require('../models').users;
const members = require('../models').members;
const jwt = require('jsonwebtoken');
const verifyOptions = {
   expiresIn: "7d",
   algorithm: "RS256"
};
const authorized = function (token) {
    let legit = jwt.verify(token, 'bwb12', verifyOptions);
    if (legit.isLogin) {
        return legit;
    } else {
        return false;
    }
};

const getMyScheduleController = function (req, res) {
    const { headers } = req;
    const login = authorized(headers.authorization);
    let result = {};
    meetings
    .findAll({
        include: [{
            model: users,
            where: { userId: login.data }
        }]
    })
    .then(results => {
        result.owner = results;
        members
        .findAll({
            include: [{
                model: users,
                where: { userId: login.data }
            }, {
                model: meetings,
                include: { model: users }
            }]
        })
        .then(results => {
            result.member = results;
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).send(err);
        })
    })
    .catch(err => {
        res.status(500).send(err);
    });
};

module.exports = {
    getMyScheduleController 
};