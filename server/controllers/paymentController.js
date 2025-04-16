const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key');
const Order = require('../models/orderModel');

// @desc    Create Stripe payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    // Get order details
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Sipariş bulunamadı' });
    }
    
    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100), // Stripe requires amount in cents
      currency: 'try',
      metadata: {
        orderId: orderId,
        userId: req.user._id.toString()
      }
    });
    
    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Webhook for Stripe events
// @route   POST /api/payment/webhook
// @access  Public
const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'your_stripe_webhook_secret'
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update order status to paid
      if (paymentIntent.metadata.orderId) {
        const order = await Order.findById(paymentIntent.metadata.orderId);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: new Date().toISOString(),
            email_address: paymentIntent.receipt_email || '',
          };
          await order.save();
        }
      }
      break;
    case 'payment_intent.payment_failed':
      // Handle failed payment if needed
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}`);
  }
  
  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
};

module.exports = {
  createPaymentIntent,
  stripeWebhook
};
