const users = require('../models').users;
const jwt = require('jsonwebtoken');
const authorized = require('../modules/tokenUtil').authorized;
const verifyOptions = require('../modules/tokenUtil').verifyOptions;

const getNicknameController = function (req, res) {
    let token = req.headers.authorization;
    if (token === undefined || !authorized(token)) {
        res.sendStatus(405);
    } else {
        let legit = jwt.verify(token, 'bwb12', verifyOptions);
        users
            .findOne({
                attributes: ['nickname'],
                where: {
                    userId: legit.data
                }
            })
            .then(result => {
                res.status(200).json({ nickname: result.nickname })
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);  //server error
            })
    }
}

module.exports = { getNicknameController };
