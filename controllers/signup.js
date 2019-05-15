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
        res.status(500).send(err);
    });
};

const idDuplicationCheckController = function (req, res) {
    const { query } = req;
    users
    .count({
        where: [{userId: query.id}]
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
};

const nicknameDuplicationCheckController = function (req, res) {
    const { query } = req;
    users
    .count({
        where: [{nickname: query.nick_name}]
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
};


module.exports = {
    postUserController,
    idDuplicationCheckController,
    nicknameDuplicationCheckController
};