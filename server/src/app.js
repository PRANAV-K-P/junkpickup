const express = require("express");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./api/middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 6000;

app.use(express.json());
app.use("/api/users", require("./api/routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));