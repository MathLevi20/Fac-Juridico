import pkg from 'pg';
import { populateDatabase } from '../db/populateDatabase.js';
const { Pool } = pkg;

const connectionString = 'postgres://postgres:1234@database:5432/postgres';

const pool = new Pool({
  connectionString: connectionString,
  ssl: false
});

// Function to check if the table exists
export async function tableExists() {
  try {
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'customers'
      );
    `);

    return result.rows[0].exists;
  } catch (error) {
    console.error('Error checking if the table exists:', error);
    throw error;
  }
}

// Function to create the table
export async function createTable() {
  try {
    await pool.query(`
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    coord_x DOUBLE PRECISION NOT NULL,
    coord_y DOUBLE PRECISION NOT NULL
);
    `);
    console.log('Table "customers" created successfully.');
  } catch (error) {
    console.error('Error creating the "customers" table:', error);
    throw error;
  }
}

// Main function to create the table if it doesn't exist
export async function main() {
  try {
    const tableAlreadyExists = await tableExists();

    if (!tableAlreadyExists) {
      await createTable();
      await populateDatabase();
    }
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1); // Exits the Node.js process in case of an error
  }
}
export default pool;
