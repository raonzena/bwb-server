const users = require('../models').users;

const postMeetingDeleteController = function (req, res) {
    const { body } = req;

    users
    .destroy({
        where: { id: body.meetingId }
    })
    .then(result => {
        res.status(201).send('success');
    })
    .catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
};

module.exports = {
    postMeetingDeleteController 
};