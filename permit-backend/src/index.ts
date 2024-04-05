import express from 'express';
import bodyParser from 'body-parser';
import questionnaireRoutes from './routes/questionnaire';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/questionnaire', questionnaireRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
