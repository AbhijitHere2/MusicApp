// Example using Express.js
const express = require("express");
const app = express();
const stripe = require("stripe")("your-razorpay-secret-key"); // This is for Stripe, use Razorpay SDK for Razorpay orders
const Razorpay = require("razorpay");

app.use(express.json());

const razorpayInstance = new Razorpay({
  key_id: "your-razorpay-key",
  key_secret: "your-razorpay-secret-key"
});

app.post("/create-razorpay-order", async (req, res) => {
  const { songId, amount, paymentMethod } = req.body;
  try {
    const options = {
      amount, // Amount in cents/paise
      currency: "INR",
      receipt: `receipt_order_${songId}`,
      payment_capture: 1 // Auto-capture payment
    };
    const order = await razorpayInstance.orders.create(options);
    res.send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
