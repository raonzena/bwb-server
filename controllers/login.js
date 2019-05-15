const users = require('../models').users;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const loginController = function (req, res) {
    let data = req.body;
    let encryptedPw = crypto.createHash('sha1').update(data.pw).digest('hex'); // 비밀번호 저장시 사용한 암호화 코드
    users
        .findOne({
            attributes: ['userId', 'userPw'],
            where: {
                userId: data.id
            }
        })
        .then(result => {
            if (!result) {
                res.sendStatus(204); // 이메일 불일치이므로 signup page로 redirect 필요
            } else if (result.userPw !== encryptedPw) {
                res.sendStatus(409); // 비밀번호 불일치
            } else {
                let token = jwt.sign({
                    data: result.userId,
                    isLogin: true
                }, 'bwb12', { expiresIn: '7d' }) // expire in 7 days
                res.status(200).json({ token: token });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(error);  //server error
        })
}


module.exports = { loginController };