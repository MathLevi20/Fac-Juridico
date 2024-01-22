import pool from '../config/database.js';
import calculateOptimalRoute from './../utils/calculateOptimalRoute.js';

async function calculateRoute(req, res) {
  try {
    const { rows: customers } = await pool.query('SELECT * FROM customers');

    if (customers.length < 2) {
      return res.status(400).json({ message: 'Insufficient number of customers to calculate the route.' });
    }

    const visitOrder = calculateOptimalRoute(customers);

    return res.status(200).json({ visitOrder });
  } catch (error) {
    console.error('Error calculating optimal route:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

export { calculateRoute };
