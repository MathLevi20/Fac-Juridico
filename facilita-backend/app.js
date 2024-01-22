// src/app.js
import express from 'express';
import  router  from './routes/clienteRoutes.js';
import { main } from "./config/database.js";
import cors from 'cors';

const app = express();

try {
    // Rotas
main();
app.use(cors())

app.use(express.json())
app.use('/api', router );

// Inicialização do servidor
const PORT = process.env.PORT || 8000;

 app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

} catch (error) {
    if(error instanceof Error)
    express.response.status(401).json({msg: error.message})
}
export default app