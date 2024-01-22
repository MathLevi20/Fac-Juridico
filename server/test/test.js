import request from 'supertest';
import app from '../app.js';

// Test to check if the route '/customers' returns status 200
describe('GET /api/customers', () => {
  it('Should return status 200', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.status).toBe(200);
  });
});

// Test to check if the route '/calculate-optimal-route' returns status 200
describe('GET /api/calculate-routes', () => {
  it('Should return status 200', async () => {
    const res = await request(app).get('/api/calculate-routes');
    expect(res.status).toBe(200);
  });
});

// Test to check if the route '/customers' returns an array (list of customers)
describe('GET /api/customers', () => {
  it('Should return a list of customers', async () => {
    const res = await request(app).get('/api/customers');
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Add more tests as needed

// Test to check if the route '/customers' returns status 201 after inserting a new customer
describe('POST /api/customers', () => {
  it('Should return status 201 after inserting a new customer', async () => {
    const randomEmailNumber = Math.floor(Math.random() * 1000);
    const newCustomer = {
      name: 'New Customer',
      email: `new_customer_${randomEmailNumber}@customer.com`,
      phone: '123456789',
      coord_x: '1',
      coord_y: '1',
    };

    const res = await request(app).post('/api/customers').send(newCustomer);
    expect(res.status).toBe(201);
  });
});
// These tests are for the basic routes of the Facilita Jurídico application.
