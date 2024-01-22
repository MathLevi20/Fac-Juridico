// populateDatabase.mjs
import pool from '../config/database.js';

async function populateDatabase() {
  try {
    // Insert dummy data into the customers table
    await pool.query(`
      INSERT INTO customers (name, email, phone, coord_x, coord_y)
      VALUES
        ('Customer 1', 'customer1@example.com', '123456789', 10, 20),
        ('Customer 2', 'customer2@example.com', '987654321', 30, 40),
        ('Customer 3', 'customer3@example.com', '555555555', 50, 60);
    `);

    console.log('Data inserted into the database successfully.');
  } catch (error) {
    console.error('Error populating the database:', error);
    throw error;
  } finally {
    // Make sure to close the database connection after execution
    await pool.end();
  }
}

// Call the function to populate the database
populateDatabase();
