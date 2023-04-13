const DateTime = require('../models/dateTimeModel');

module.exports = {
  addDateTime: async ({ dateObj, TArray }) => {
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
            blocked: '$time_slots.blocked',
          },
        },
      ]);
      if (times) {
        return times;
      }
      return false;
    } catch (err) {}
  },
  updateTimeStatus: async ({ dateObj, times }) => {
    const response = await DateTime.findOneAndUpdate(
      { date: dateObj },
      { 'time_slots.$[elem].blocked': true },
      {
        arrayFilters: [{ 'elem.time': { $in: times } }],
        new: true,
      },
    );
    if (response) {
      return response;
    }
    return false;
  },
};