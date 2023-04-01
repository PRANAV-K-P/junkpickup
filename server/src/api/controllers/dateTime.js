const asyncHandler = require('express-async-handler');

// @desc Add date and timeSlots
// @route POST /api/admin/date
// @access private
const addDateTime = asyncHandler(async (req, res) => {
    try {
        console.log("reached the server");
        const { date, timeSlot } = req.body;
        // const dateObj = new Date(date)
        // console.log(dateObj);
        // console.log(timeSlot);

        const newDate = new Date(date);
        console.log(newDate);
        res.json({ date });
    } catch(err) {
        console.log(err);
    }
  
});

module.exports = { addDateTime };
