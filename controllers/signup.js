const users = require('../models').users;

const postUserController = function (req, res) {
    const { body } = req;
    console.log(req);
    // users.create({
    //     userId: body.id,
    //     userPw: body.pw,
    //     nickname: body.nick_name,
    //     gender: body.gender
    // });
    res.status(201).send('success');
};

module.exports = {
    postUserController
};