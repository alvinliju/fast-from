import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import formsRouter from './routes/forms.js';
import responsesRouter from './routes/response.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/forms', formsRouter);
app.use('/api/responses', responsesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'FastForm API is running!' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('Environment check:');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
  console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? '✅ Set' : '❌ Missing');
});