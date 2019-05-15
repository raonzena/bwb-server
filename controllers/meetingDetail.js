const meetings = require('../models').meetings;
const users = require('../models').users;

const getMeetingDetailController = function (req, res) {
    const { query } = req;

    meetings
    .findOne({
        include: [users],
        where: { id: query.meetingId }
    })
    .then(result => {
        console.log(result);
        if(result) {
            res.status(200).json(result);
        } else {
            res.status(200).send();
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};

module.exports = {
    getMeetingDetailController 
};