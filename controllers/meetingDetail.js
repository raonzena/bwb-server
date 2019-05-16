const meetings = require('../models').meetings;
const users = require('../models').users;
const members = require('../models').members;

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
};