const PaymentModel = require('../models/paymentModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

exports.processPayment = async (req, res) => {
  try {
    const { amount, currency, paymentMethodId, customerEmail } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: 'Missing required payment fields: amount and currency' });
    }

    // Simulate Stripe payment intent creation
    const paymentIntent = {
      id: `pi_${Math.random().toString(36.substring(2, 11))}`,
      status: 'succeeded',
      amount,
      currency
    };

    // Save transaction to DB
    const savedTransaction = await PaymentModel.createTransaction(paymentIntent.id, amount, paymentIntent.status);

    return res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      transaction: savedTransaction
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({ error: 'Internal server error during payment processing' });
  }
};
