import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import formsRouter from './routes/forms.ts';
import responsesRouter from './routes/response.ts';

env.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log(process.env.SUPABASE_URL);
console.log(process.env.PORT)

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
    res.json({status: 'ok'})
})

app.use('/api/forms', formsRouter);
app.use('/api/responses', responsesRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});