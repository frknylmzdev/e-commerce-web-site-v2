const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createPaymentIntent,
  stripeWebhook
} = require('../controllers/paymentController');

// Protected routes
router.route('/create-payment-intent').post(protect, createPaymentIntent);

// Public webhook route (Stripe needs raw body)
router.route('/webhook').post(express.raw({ type: 'application/json' }), stripeWebhook);

module.exports = router;
