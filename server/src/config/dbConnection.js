const mongoose = require('mongoose');

// mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      'Database connected: ',
      connect.connection.host,
      connect.connection.name,
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
