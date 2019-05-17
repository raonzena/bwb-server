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

<<<<<<< HEAD
exports.authorized = function (token) {
    tokenBlacklist
=======
exports.authorized = async function (token) {
    return await tokenBlacklist
>>>>>>> fb55404e015ea105c7c63d573d06f4d0941add86
        .findOne({
            where: {
                tokens: token
            }
        })
        .then(tokenResult => {
            if (tokenResult) {
                return false;
            } else {
<<<<<<< HEAD
                let legit = jwt.verify(token, 'bwb12', verifyOptions);
=======
                let legit = jwt.verify(token, 'bwb12', this.verifyOptions);
>>>>>>> fb55404e015ea105c7c63d573d06f4d0941add86
                if (legit.isLogin) {
                    return true;
                } else {
                    return false;
                }
            }
        })
}