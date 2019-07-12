const meetings = require('../models').meetings;
const members = require('../models').members;
const Sequelize = require('sequelize');

const op = Sequelize.Op

const dateRangeGen = () => {
    let dateRange = {};
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    dateRange.minDate = new Date(year, month, date);
    dateRange.maxDate = new Date(year, month, date + 1);
    return dateRange;
}
const isActive = (meetingTime) => {
    if (meetingTime.getTime() > new Date().getTime()) {
        return true;
    } else {
        return false;
    }
}

const restaurantMeetingList = function (req, res) {
    let data = req.query.q;
    meetings
        .findAll({
            where: {
                restaurant_id: data,
                time: {
                    [op.gte]: dateRangeGen().minDate,
                    [op.lt]: dateRangeGen().maxDate
                }
            }
        })
        .then(meetingResult => {
            const resultGen = async () => {
                let result = [];

                for (let i = 0; i < meetingResult.length; i++) {
                    let memberCount = await members.findAndCountAll({
                        where: { meeting_id: meetingResult[i].dataValues.id }
                    })
                    let newResult = {};
                    newResult.placeId = data;
                    newResult.meetingId = meetingResult[i].dataValues.id;
                    newResult.meetingName = meetingResult[i].dataValues.name;
                    newResult.meetingTime = meetingResult[i].dataValues.time;
                    newResult.numberOfMembers = memberCount.count;
                    newResult.limit = meetingResult[i].dataValues.limit;
                    newResult.isActive = isActive(meetingResult[i].dataValues.time);
                    result.push(newResult);
                }
                res.status(200).json({ result: result });
            }
            resultGen();
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
}

module.exports = {
  restaurantMeetingList
};