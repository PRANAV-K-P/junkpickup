const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/dbConnection');
const errorHandler = require('./api/middleware/errorHandler');

connectDB();

const port = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://junkpickup.online/',
  },
});

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
});

app.use(express.static(path.join(__dirname,'../public')))
app.use('/api/users', require('./api/routes/user.route'));
app.use('/api/admin', require('./api/routes/admin.route'));
app.use('/api/pincode', require('./api/routes/pincode.route'));
app.use('/api/datetime', require('./api/routes/dateTime.route'));
app.use('/api/items', require('./api/routes/item.route'));
app.use('/api/bookings', require('./api/routes/booking.route'));
app.use('/api/banners', require('./api/routes/banner.route'));
app.use('/api/recycling-centers', require('./api/routes/recycle.route'));
app.use('/api/conversations', require('./api/routes/conversation.route'));
app.use('/api/messages', require('./api/routes/message.route'));
app.use('/api/faqs', require('./api/routes/faq.route'));

app.use(errorHandler);

server.listen(port, () => console.log(`Server running on port ${port}`));
