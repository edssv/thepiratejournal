import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import AdminPanelRoute from './routes/admin-panel.route';
import ArticlesRoute from './routes/articles.route';
import AuthRoute from './routes/auth.route';
import DraftsRoute from './routes/drafts.route';
import UsersRoute from './routes/users.route';
import UploadsRoute from './routes/uploads.route';
import errorMiddleware from './middlewares/error-middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(errorMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL, process.env.ADMIN_PANEL_URL],
    })
);

app.use('/api', UsersRoute);
app.use('/api', AuthRoute);
app.use('/api', ArticlesRoute);
app.use('/api', DraftsRoute);
app.use('/api', UploadsRoute);
app.use('/api/admin', AdminPanelRoute);
app.use('/api', express.static(path.join(__dirname, '../media')));

// Initialize DB
require('./initDB')();

app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
