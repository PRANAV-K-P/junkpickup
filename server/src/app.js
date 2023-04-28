const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./api/middleware/errorHandler');

connectDB();

const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use('/api/users', require('./api/routes/user.route'));
app.use('/api/admin', require('./api/routes/admin.route'));
app.use('/api/pincode', require('./api/routes/pincode.route'));
app.use('/api/datetime', require('./api/routes/dateTime.route'));
app.use('/api/items', require('./api/routes/item.route'));
app.use('/api/bookings', require('./api/routes/booking.route'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
