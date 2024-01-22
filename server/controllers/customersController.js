import pool from '../config/database.js';

// List all customers
async function listCustomers(req, res) {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (error) {
    console.error('Error listing customers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Register a new customer
async function registerCustomer(req, res) {
  const { name, email, phone, coord_x, coord_y } = req.body;

  try {
    if (!name || !email || phone === undefined || coord_x === undefined || coord_y === undefined) {
      return res.status(400).json({ message: 'All fields are mandatory.' });
    }

    await pool.query(
      'INSERT INTO customers (name, email, phone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, coord_x, coord_y]
    );

    return res.status(201).json({ message: 'Customer registered successfully.' });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Update an existing customer
async function updateCustomer(req, res) {
  const customerId = req.params.id;
  const { name, email, phone, coord_x, coord_y } = req.body;

  try {
    const result = await pool.query(
      'UPDATE customers SET name = $1, email = $2, phone = $3, coord_x = $4, coord_y = $5 WHERE id = $6',
      [name, email, phone, coord_x, coord_y, customerId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    return res.json({ message: 'Customer updated successfully.' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// Delete a customer
async function deleteCustomer(req, res) {
  const customerId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM customers WHERE id = $1', [customerId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    return res.json({ message: 'Customer deleted successfully.' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export { listCustomers, registerCustomer, updateCustomer, deleteCustomer };
