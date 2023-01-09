require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const uploadsRoutes = require('./routes/uploads');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(errorMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }),
);

// routes
app.use('/api', router);
app.use('/api', usersRoutes);
app.use('/api', authRoutes);
app.use('/api', articlesRoutes);
app.use('/api', uploadsRoutes);

app.use(express.static('../frontend/build'));
app.use(express.static('./uploads'));

// connect to db
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
