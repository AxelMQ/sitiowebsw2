import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './src/routes/api.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`==================================================`);
  console.log(` Servidor Backend ejecutándose en el puerto ${port}`);
  console.log(` Ruta del endpoint de la API: /api/chat`);
  console.log(`==================================================`);
});
