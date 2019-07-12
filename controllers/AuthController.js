const users = require('../models').users;
const tokenBlacklist = require('../models').tokenBlacklist;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const tokenMaker = require('../modules/tokenUtil').tokenMaker;
const Sequelize = require('sequelize');
const verifyOptions = require('../modules/tokenUtil').verifyOptions;
const authorized = require('../modules/tokenUtil').authorized;
const meetings = require('../models').meetings;
const members = require('../models').members;
const op = Sequelize.Op;

const login = function (req, res) {
  console.log(new Date(24 * 3600 * 1000))
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
        let token = tokenMaker(result.userId)
        res.status(200).json({ token: token });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);  //server error
    })
}

const logout = function (req, res) {
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
              [op.lt]: new Date()
            }
          }
        })
    })
    .then(result => {
      res.status(201).send('success');
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
}

const getNickname = function (req, res) {
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

const getMySchedule = function (req, res) {
    const { headers } = req;
    if(authorized(headers.authorization)) {
        let result = {owner:[], member:[]};
        let legit = jwt.verify(headers.authorization, 'bwb12', verifyOptions);
        meetings
        .findAll({
            include: [{
                model: users,
                where: {
                    userId: legit.data
                }
            }]
        })
        .then(async results => {
            await results.forEach(async meeting => {
                await members
                .findAndCountAll({
                    where: {
                        meeting_id : meeting.dataValues.id
                    }
                })
                .then(memberResult => {
                    var obj = {};
                    obj.restaurant_name = meeting.dataValues.name;
                    obj.reservation_time = meeting.dataValues.time;
                    obj.limit = meeting.dataValues.limit;
                    obj.member_count = memberResult.count;
                    result.owner.push(obj);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
            })
            members
            .findAll({
                include: [{
                    model: users,
                    where: {
                        userId: legit.data
                    }
                }, {
                    model: meetings,
                    include: {
                        model: users
                    }
                }]
            })
            .then(async results => {
                await results.forEach(async (member, index) => {
                    await members
                    .findAndCountAll({
                        where: {
                            meeting_id : member.dataValues.meeting.id
                        }
                    })
                    .then(memberResult => {
                        var obj = {};
                        obj.restaurant_name = member.dataValues.meeting.name;
                        obj.reservation_time = member.dataValues.meeting.time;
                        obj.limit = member.dataValues.meeting.limit;
                        obj.member_count = memberResult.count;
                        result.member.push(obj);
                        if(index === (results.length - 1)) {
                            res.status(200).json(result);
                        }
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    })     
                })
            })
            .catch(err => {
                res.status(500).send(err);
            })
        })
        .catch(err => {
            res.status(500).send(err);
        });   
    }
};

module.exports = { 
  login,
  logout,
  getNickname,
  getMySchedule
};