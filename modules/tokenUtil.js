const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../models').tokenBlacklist;

exports.verifyOptions = {
    expiresIn: 24 * 3600 * 1000,
    algorithm: "RS256"
}

exports.tokenMaker = (userId) => {
    return jwt.sign({
        iat: Date.parse(new Date()),
        data: userId,
        isLogin: true
    }, 'bwb12', { expiresIn: 24 * 3600 * 1000 })
}

exports.authorized = async function (token) {
    return await tokenBlacklist
        .findOne({
            where: {
                tokens: token
            }
        })
        .then(tokenResult => {
            if (tokenResult) {
                return false;
            } else {
                let legit = jwt.verify(token, 'bwb12', this.verifyOptions);
                if (legit.isLogin) {
                    return true;
                } else {
                    return false;
                }
            }
        })
}