const meetings = require('../models').meetings;
const members = require('../models').members;

const postMeetingDeleteController = function (req, res) {
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
    postMeetingDeleteController
};