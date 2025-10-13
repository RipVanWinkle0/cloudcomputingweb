import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
app.use('/api', routes);

export default app;
export const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}