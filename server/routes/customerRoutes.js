// src/routes/customerRoutes.js
import express from 'express';
import {
  listCustomers,
  registerCustomer,
  deleteCustomer,
  updateCustomer
} from './../controllers/customersController.js';
import { calculateRoute } from './../controllers/routeController.js';

const router = express.Router();

// Routes for managing customers
router.get('/customers', listCustomers);
router.post('/customers', registerCustomer);
router.delete('/customers/:id', deleteCustomer);
router.patch('/customers/:id', updateCustomer);

// Route for calculating optimal route
router.get('/calculate-route', calculateRoute);

export default router;
