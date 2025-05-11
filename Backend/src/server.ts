import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/conn';
import AuthRouter from './routes/auth';
import NewsRouter from './routes/news';
import UploadRouter from './routes/upload';

dotenv.config();
const app = express();
app.use(express.json());

connectDB();
app.use('/api/v1/news', NewsRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/upload', UploadRouter);
app.get('/api/v1', (_req: Request, res: Response) => {
    res.send('Server is running!');
});
app.listen(process.env.PORT || 5000, () => console.log('Server started on port 5000'));
