const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../src/routes/paymentRoutes');

const app = express();
app.use(express.json());
app.use('/api/v1/payments', paymentRoutes);

describe('Payment Gateway API Endpoints', () => {
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/api/v1/payments/process')
      .send({ amount: 100 }); // missing currency
      
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
