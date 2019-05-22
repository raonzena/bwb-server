const meetings = require('../models').meetings;
const members = require('../models').members;
const Sequelize = require('sequelize');

const op = Sequelize.Op


const meetingListsController = (req, res) => {
    let data = req.body.restaurantInfos;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    let minDate = new Date(year, month, date);
    let maxDate = new Date(year, month, date + 1);
    const isActive = (meetingTime) => {
        if (meetingTime.getTime('+09:00') > now.getTime()) {
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
    const findMeetings = async () => {
        let meetingResult = [];
        for (let i = 0; i < data.length; i++) {
            let aMeeting = await meetings.findAll({
                where: {
                    restaurant_id: data[i].place_id,
                    time: {
                        [op.gte]: minDate,
                        [op.lt]: maxDate
                    }
                }
            })
            if (aMeeting.length >= 1) {
                aMeeting.forEach(e => meetingResult.push(e))
            }
        }
        return meetingResult;
    }
    findMeetings()
        .then(meetingResult => {
            if (meetingResult.length === 0) {
                res.status(200).json({ result: [] })
            } else {
                const resultGen = async () => {
                    let result = [];
                    for (let i = 0; i < meetingResult.length; i++) {
                        console.log(meetingResult[i].dataValues)
                        let memberResult = await members
                            .findAndCountAll({
                                where: { meeting_id: meetingResult[i].dataValues.id }
                            })
                        let newResult = {};
                        newResult.placeId = meetingResult[i].dataValues.restaurant_id
                        newResult.meetingId = meetingResult[i].dataValues.id;
                        newResult.meetingName = meetingResult[i].dataValues.name;
                        newResult.meetingTime = dateFormat(meetingResult[i].dataValues.time);
                        newResult.numberOfMembers = memberResult.count;
                        newResult.limit = meetingResult[i].dataValues.limit;
                        newResult.isActive = isActive(meetingResult[i].dataValues.time);
                        result.push(newResult);
                    }
                    res.status(200).json({ result: result })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send(err);
                        })
                }
                resultGen();
            }
        })
};

module.exports = { meetingListsController };

