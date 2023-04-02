const asyncHandler = require('express-async-handler');
const dateTimeService = require('../services/dateTime');
const crypto = require('crypto');

// @desc Add date and timeSlots
// @route POST /api/admin/date
// @access private
const addDateTime = asyncHandler(async (req, res) => {
    console.log('reached the server');
    const { date, timeSlot } = req.body;
    const dateObj = new Date(date);
    const dateAvailable = await dateTimeService.dateExist(dateObj);
    if (dateAvailable) {
      res.status(400);
      throw new Error('Date already added');
    }
    let TArray = [];
    timeSlot.map((item) => {
      TArray.push({ time: item.time, isbooked: false });
    });
    const dateTime = await dateTimeService.addDateTime({ dateObj, TArray });
    if (dateTime) {
      res.status(201).json(dateTime);
    } else {
      res.status(400);
      throw new Error('Date or Time is not valid');
    }
});

// @desc Add date and timeSlots
// @route POST /api/admin/date
// @access private
const getAllTime = asyncHandler(async (req, res) => {
    console.log("Entered in getalltime in controller");
    const date = req.params.id;
    const dateObj = new Date(date);
    console.log(dateObj,"-- date object");
    const time = await dateTimeService.getAllTime(dateObj);
    if(time) {
        let timeSlots = [];
        time.map((item) => {
            const uuid = crypto.randomUUID();
            timeSlots.push({id: uuid, time: item.time, status: false})
        })
        console.log(timeSlots,"-- timeslots");
        res.status(200).json({message: "All times are here",timeSlots});
    } else {
        res.status(404);
        throw new Error('Time not found');
    }
})

module.exports = { addDateTime, getAllTime };
