import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './DB/conn';
import AuthRouter from './routes/auth';
import NewsRouter from './routes/blog';
import UploadRouter from './routes/upload';
import CategoryRouter from './routes/category';
import express, { Request, Response } from 'express';

dotenv.config();
const app = express();
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}));
app.use(express.json());

// Increase the limit to, for example, 10MB
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

connectDB();
app.use('/api/v1/blog', NewsRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/upload', UploadRouter);
app.use('/api/v1/categories',CategoryRouter);
app.get('/api/v1', (_req: Request, res: Response) => {
    res.send('Server is running!');
});

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is running!');
});

app.listen(process.env.PORT || 8080, () => console.log(`Server started on http://localhost:${process.env.PORT}`));
