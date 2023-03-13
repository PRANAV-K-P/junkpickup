const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./api/middleware/errorHandler');

connectDB();
const app = express();

const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use('/api/users', require('./api/routes/userRoutes'));
app.use('/api/admin', require('./api/routes/adminRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
