const users = require('../models').users;

const postUserController = function (req, res) {
    const { body } = req;
    users
    .create({
        userId: body.id,
        userPw: body.pw,
        nickname: body.nick_name,
        gender: body.gender
    })
    .then(result => {
        res.status(201).send('success');
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('error');
    });
};

const idDuplicationCheckController = function (req, res) {
    const { body } = req;
    users
    .count({
        where: [{userId: body.id}]
    })
    .then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        console.log(err);
        res.status(404).send('error');
    });
};


module.exports = {
    postUserController
};