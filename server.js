// server.js
// const express = require('express');
// const Razorpay = require('razorpay');
// const cors = require('cors');
import express from 'express'
import Razorpay from 'razorpay'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

// Replace with your actual Razorpay credentials
const razorpayInstance = new Razorpay({
  key_id: 'your-razorpay-key',
  key_secret: 'your-razorpay-secret-key'
});

// Endpoint to create a Razorpay order
app.post('/create-razorpay-order', async (req, res) => {
  const { songId, amount, paymentMethod } = req.body;

  if (!songId || !amount) {
    return res.status(400).json({ error: 'songId and amount are required' });
  }

  try {
    const options = {
      amount, // Amount in paise (if INR) e.g., 50000 means INR 500.00
      currency: 'INR',
      receipt: `receipt_order_${songId}`,
      payment_capture: 1 // Auto-capture payment
    };

    const order = await razorpayInstance.orders.create(options);
    console.log("Order created:", order);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
