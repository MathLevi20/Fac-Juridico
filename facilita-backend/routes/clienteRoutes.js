// src/routes/clienteRoutes.js
import express from 'express';
import { listarClientes, cadastrarCliente,excluirCliente ,atualizarCliente} from './../controllers/clientesController.js';
import { calcularRota } from './../controllers/rotaController.js';

const router = express.Router();

router.get('/clientes', listarClientes);
router.post('/clientes', cadastrarCliente);
router.delete('/clientes/:id', excluirCliente);
router.patch('/clientes/:id', atualizarCliente);
router.get('/calcular-rotas', calcularRota);

export default router;
