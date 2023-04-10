const DateTime = require('../models/dateTimeModel');

module.exports = {
  addDateTime: async ({ dateObj, TArray }) => {
    console.log(dateObj, TArray);
    const response = await DateTime.create({
      date: dateObj,
      time_slots: TArray,
    });
    if (response) {
      return response;
    }
    return false;
  },
  dateExist: async (dateObj) => {
    const dateAvailable = await DateTime.findOne({ date: dateObj });
    if (dateAvailable) {
      return dateAvailable;
    }
    return false;
  },
  getAllTime: async (dateObj) => {
    try {
      console.log('Entered in getAlltime in service');
      //   const times = await DateTime.find({date: dateObj});
      const times = await DateTime.aggregate([
        {
          $match: { date: dateObj },
        },
        {
          $unwind: '$time_slots',
        },
        {
          $project: {
            _id: 0,
            id: '$time_slots.id',
            time: '$time_slots.time',
            status: '$time_slots.status',
            blocked: '$time_slots.blocked',
          },
        },
      ]);
      if (times) {
        console.log(times, 'times in services');
        return times;
      }
      console.log(
        dateAvailable,
        "doesn't enter the if i dateExist in services",
      );
      return false;
    } catch (err) {}
  },
  updateTimeStatus: async ({ dateObj, times }) => {
    const response = await DateTime.findOneAndUpdate(
      { date: dateObj }, // filter
      { 'time_slots.$[elem].blocked': true }, // update
      {
        arrayFilters: [
          { 'elem.time': { $in: times } },
        ], // array filters
        new: true, // option to return the updated document
      },
    );
    if (response) {
      console.log(response,"response after updating");
      return response;
    }
    return false;
  },
};
