const asyncHandler = require('express-async-handler');
const dateTimeService = require('../services/dateTime');
const crypto = require('crypto');
const nodeCron = require('node-cron');

// @desc Add date and timeSlots
// @route POST /api/admin/date
// @access private
const addDateTime = asyncHandler(async (req, res) => {
  console.log('reached the server');
  const { date, timeSlot } = req.body;
  const dateObj = new Date(date);

  dateObj.setDate(dateObj.getDate() + parseInt(1));
  dateObj.setUTCHours(0, 0, 0, 0);

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

// @desc Get timeslots based on date
// @route GET /api/admin/dates/:id
// @access private
const getAllTime = asyncHandler(async (req, res) => {
  console.log('Entered in getalltime in controller');
  const date = req.params.id;
  const dateObj = new Date(date);
  console.log(dateObj, '-- date object');
  const time = await dateTimeService.getAllTime(dateObj);
  if (time) {
    let timeSlots = [];
    time.map((item) => {
      const uuid = crypto.randomUUID();
      timeSlots.push({ id: uuid, time: item.time, status: false });
    });
    console.log(timeSlots, '-- timeslots');
    res.status(200).json({ message: 'All times are here', timeSlots });
  } else {
    res.status(404);
    throw new Error('Time not found');
  }
});

const cronJob = async () => {
  try {
    const timeSlots = [
      { time: '9 AM', status: false, isbooked: false },
      { time: '10 AM', status: false, isbooked: false },
      { time: '11 AM', status: false, isbooked: false },
      { time: '12 PM', status: false, isbooked: false },
      { time: '2 PM', status: false, isbooked: false },
      { time: '3 PM', status: false, isbooked: false },
      { time: '4 PM', status: false, isbooked: false },
      { time: '5 PM', status: false, isbooked: false },
    ];
    // 6 days date should be added to db
    for (let i = 1; i <= 6; i++) {
      const currentDate = new Date();
      currentDate.setUTCHours(0, 0, 0, 0);
      currentDate.setDate(currentDate.getDate() + parseInt(i));

      //--> to avoid unnecessary creation of documents while developing
      const dateObj = currentDate
      const dateAvailable = await dateTimeService.dateExist(dateObj);
      if (dateAvailable) {
        return false;
      }
      //<-- can remove in production

      const dateTime = await dateTimeService.addDateTime({ dateObj: currentDate, TArray: timeSlots });
      if (!dateTime) {
        throw new Error('Invalid Date and Time');
      } 
    }
  } catch (err) {
    console.log(err);
  }
};

// nodeCron.schedule('*/4 * * * * *',cronJob, {
//   scheduled: true,
//   timezone: 'Asia/Kolkata',
// });

// it should work on every sunday at a specific time
nodeCron.schedule('50 21 * * 6', cronJob, {
  scheduled: true,
  timezone: 'Asia/Kolkata',
});

module.exports = { addDateTime, getAllTime };
