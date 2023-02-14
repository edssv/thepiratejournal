require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const articlesRoutes = require('./routes/articles');
const uploadsRoutes = require('./routes/uploads');
const adminPanelRoutes = require('./routes/admin-panel');
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
        origin: [process.env.CLIENT_URL, process.env.ADMIN_PANEL_URL, 'http://194.67.121.62:3001'],
    })
);

// routes
app.use('/api', router);
app.use('/api', usersRoutes);
app.use('/api', authRoutes);
app.use('/api', articlesRoutes);
app.use('/api', uploadsRoutes);
// admin-panel routes
app.use('/api/admin', adminPanelRoutes);

app.use('/api', express.static(path.join(__dirname, 'media')));

// Initialize DB
require('./initDB')();

app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
