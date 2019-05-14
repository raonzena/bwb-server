const users = require('../models/users');
const db = require('./dbConnect');

const postUserController = function(req, res) {
    const { body } = req;
    users.create({
        userId: id,
        userPw: pw,
        nickname: nick_name,
        gender: gender
    });
    res.status(201).send('success');
};

module.exports = {
    postUserController
};