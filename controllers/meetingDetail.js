const meetings = require('../models').meetings;
const users = require('../models').users;
const members = require('../models').members;
<<<<<<< HEAD

const getMeetingDetailController = function (req, res) {
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
        res.status(200).json(results);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};

module.exports = {
    getMeetingDetailController 
=======
const verifyOptions = require('../modules/tokenUtil').verifyOptions;
const jwt = require('jsonwebtoken');

const getMeetingDetailController = function (req, res) {
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

module.exports = {
    getMeetingDetailController
>>>>>>> fb55404e015ea105c7c63d573d06f4d0941add86
};