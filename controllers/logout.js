const users = require('../models').users;
const jwt = require('jsonwebtoken');

const logoutController = function (req, res) {
    res.sendStatus(200);
}

module.exports = { logoutController };