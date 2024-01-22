// src/app.js
import express from 'express';
import router from './routes/customerRoutes.js';
import { main } from "./config/database.js";
import cors from 'cors';

const app = express();

try {
  // Routes
  main();
  app.use(cors());

  app.use(express.json());
  app.use('/api', router);

  // Server initialization
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

} catch (error) {
  if (error instanceof Error)
    express.response.status(401).json({ msg: error.message });
}

export default app;
