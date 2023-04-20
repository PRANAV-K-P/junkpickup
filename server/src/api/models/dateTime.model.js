const mongoose = require('mongoose');

const dateTimeSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time_slots: [
      {
        id: { type: String },
        time: { type: String },
        blocked: { type: Boolean },
        isbooked: { type: Boolean },
      },
    ],
  },
  {
    collection: 'date_time_slots',
  },
);

module.exports = mongoose.model('DateTimeSlots', dateTimeSchema);