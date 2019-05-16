const tokenBlacklist = require('../models').tokenBlacklist;
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const verifyOptions = require('../modules/tokenUtil').verifyOptions;
const op = Sequelize.Op;


const logoutController = function (req, res) {
    let token = req.headers.authorization;
    let legit = jwt.verify(token, 'bwb12', verifyOptions);
    let expiresIn = legit.exp
    console.log(new Date(expiresIn))
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
                            [op.lt]: new Date()
                        }
                    }
                })
        })
}

module.exports = { logoutController };