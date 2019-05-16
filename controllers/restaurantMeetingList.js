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
    if (meetingTime.getTime('+09:00') > new Date().getTime()) {
        return true;
    } else {
        return false;
    }
}
const dateFormat = (meetingTime) => {
    let year = meetingTime.getFullYear();
    let month = meetingTime.getMonth() + 1;
    let date = meetingTime.getDate();
    let time = meetingTime.toLocaleTimeString().slice(0, 5);
    if (month.toString().length === 1) {
        month = '0' + month;
    }
    return year + '-' + month + '-' + date + ' ' + time;
}
const restaurantMeetingListController = function (req, res) {
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
                    newResult.meetingTime = dateFormat(meetingResult[i].dataValues.time);
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


module.exports = { restaurantMeetingListController };


// .findAll({
//     include: [{
//         attributes: ['members_id'],
//         model: meetings,
//         attributes: ['id', 'restaurant_id', 'name', 'owner_id', 'time', 'limit'],
//         where: {
//             restaurant_id: data,
//             time: {
//                 [op.gte]: dateGen().minDate,
//                 [op.lt]: dateGen().maxDate
//             }
//         },
//     }]
// })