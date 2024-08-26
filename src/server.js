import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Vercel!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
