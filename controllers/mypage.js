const meetings = require('../models').meetings;
const users = require('../models').users;
const members = require('../models').members;
const jwt = require('jsonwebtoken');
const authorized = require('../modules/tokenUtil').authorized;
const verifyOptions = require('../modules/tokenUtil').verifyOptions;

const getMyScheduleController = function (req, res) {
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
    getMyScheduleController
};