const asyncHandler = require('express-async-handler');
const dateTimeService = require('../services/dateTime');
const crypto = require('crypto');
const nodeCron = require('node-cron');

// @desc Add date and timeSlots
// @route POST /api/datetime
// @access private
const updateTimeStatus = asyncHandler(async (req, res) => {
  const { date, timeSlot } = req.body;
  const dateObj = new Date(date);

  dateObj.setDate(dateObj.getDate() + parseInt(1));
  dateObj.setUTCHours(0, 0, 0, 0);

  // const dateAvailable = await dateTimeService.dateExist(dateObj);
  // if (dateAvailable) {
  //   res.status(400);
  //   throw new Error('Date already added');
  // }

  let times = [];
  timeSlot.forEach((timeObj) => {
    times.push(timeObj.time);
  });

  const dateTime = await dateTimeService.updateTimeStatus({ dateObj, times });
  if (dateTime) {
    res.status(200).json(dateTime);
  } else {
    res.status(400);
    throw new Error('Date or Time is not valid');
  }
});

// @desc Get timeslots based on date
// @route GET /api/datetime/admin/:id
// @access private
const getAllTimeAdmin = asyncHandler(async (req, res) => {
  const date = req.params.id;
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + parseInt(1));
  dateObj.setUTCHours(0, 0, 0, 0);
  const timeSlots = await dateTimeService.getAllTime(dateObj);
  if (timeSlots) {
    res.status(200).json({ timeSlots });
  } else {
    res.status(404);
    throw new Error('Time not found');
  }
});

const cronJob = async () => {
  try {
    const timeSlots = [
      { time: '9 AM' },
      { time: '10 AM' },
      { time: '11 AM' },
      { time: '12 PM' },
      { time: '2 PM' },
      { time: '3 PM' },
      { time: '4 PM' },
      { time: '5 PM' },
    ];

    // 6 days date should be added to db
    for (let i = 1; i <= 6; i++) {
      timeSlots.forEach((item) => {
        item.id = crypto.randomUUID();
        item.blocked = false;
        item.isbooked = false;
      });
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + parseInt(i));

      //--> to avoid unnecessary creation of documents while developing
      const dateObj = currentDate;
      const dateAvailable = await dateTimeService.dateExist(dateObj);
      if (dateAvailable) {
        return false;
      }
      //<-- can remove in production

      const dateTime = await dateTimeService.addDateTime({
        dateObj: currentDate,
        TArray: timeSlots,
      });
      if (!dateTime) {
        throw new Error('Invalid Date and Time');
      }
    }
  } catch (err) {}
};

// it should work on every sunday at a specific time
nodeCron.schedule('10 21 * * 0', cronJob, {
  scheduled: true,
  timezone: 'Asia/Kolkata',
});

// @desc Get timeslots based on date
// @route GET /api/datetime/users/:id
// @access private
const getAllTimeUser = asyncHandler(async (req, res) => {
  const date = req.params.id;
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + parseInt(1));
  dateObj.setUTCHours(0, 0, 0, 0);
  const timeSlots = await dateTimeService.getAllTime(dateObj);
  if (timeSlots) {
    let times = [];
    timeSlots.forEach((item) => {
      if (item.blocked === false && item.isbooked === false) {
        times.push(item);
      }
    });
    res.status(200).json(times);
  } else {
    res.status(404);
    throw new Error('Time not found');
  }
});

// @desc update the state of selected time in timeslots
// @route PUT /api/datetime/bookings
// @access private
const updateIsBooked = asyncHandler(async (req, res) => {
  const { date, timeId } = req.body;
  if (!timeId || !date) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + parseInt(1));
  dateObj.setUTCHours(0, 0, 0, 0);
  let time = await dateTimeService.updateIsBooked(dateObj, timeId);
  if (time) {
    res.status(200).json(time);
  } else {
    res.status(404);
    throw new Error('Time is not present');
  }
});

module.exports = {
  updateTimeStatus,
  getAllTimeAdmin,
  getAllTimeUser,
  updateIsBooked,
};
