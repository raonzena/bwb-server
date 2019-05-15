const tokenBlacklist = require('../models').tokenBlacklist;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

const op = Sequelize.Op;

const verifyOptions = {
    expiresIn: "7d",
    algorithm: "RS256"
}

const logoutController = function (req, res) {
    let token = req.headers.authorization;
    let legit = jwt.verify(token, 'bwb12', verifyOptions);
    let expiresIn = legit.exp
    tokenBlacklist
        .create({
            tokens: token,
            expiresIn: expiresIn
        })
        .then(result => {
            tokenBlacklist
                .destroy({
                    where: {
                        expiresIn: {
                            [op.lt]: expiresIn
                        }
                    }
                })
        })
}

module.exports = { logoutController };