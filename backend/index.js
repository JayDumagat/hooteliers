require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//routes
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const roomTypeRoutes = require('./routes/roomTypeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const iotDeviceRoutes = require('./routes/iotDeviceRoutes');
const iotCardRoutes = require('./routes/iotCardRoutes');


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors(
    {
        origin: process.env.FRONTEND_API_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

//session middleware

app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
    },
}));

//default route
app.get('/', (req, res) => {
    res.send('Hi!, Backend is running!');
});

//use routes
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/roomTypes', roomTypeRoutes);
app.use('/bookings', bookingRoutes);
app.use('/iot-devices', iotDeviceRoutes);
app.use('/iot-cards', iotCardRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});