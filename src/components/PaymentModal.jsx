// src/components/PaymentModal.jsx
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { SiGooglepay, SiPhonepe } from "react-icons/si";
import { FaPaypal } from "react-icons/fa";
import donate from '../naeImg/donate.jpg'

const PaymentModal = ({ isOpen, onSuccess, onClose, songId, amount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const launchRazorpay = async (paymentMethod) => {
    setLoading(true);
    setError(null);
    try {
      // Call your backend to create a Razorpay order
      const response = await fetch("http://localhost:4242/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId, amount, paymentMethod })
      });
      const orderData = await response.json();

      // Options for Razorpay Checkout
      const options = {
        key: "your-razorpay-key", // Replace with your actual Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Music App",
        description: `Purchase Song ID: ${songId}`,
        order_id: orderData.id,
        handler: function (response) {
          // On successful payment, trigger the success callback
          onSuccess();
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999"
        },
        notes: { songId: songId },
        theme: { color: "#3399cc" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setError("Payment initialization failed.");
    }
    setLoading(false);
  };

  return (
    <Popup className=" rounded-2xl" open={isOpen} closeOnDocumentClick onClose={onClose} modal nested>
      <div className="bg-red  rounded-lg shadow-lg  text-center p-2 ">
        <h2 className="text-xl font-bold mb-4">Complete Purchase</h2>
        {/* <p className="mb-4">Select a payment method to unlock this song:</p> */}
        <div className="flex justify-center mb-5">
        <img className="w-24 " src={donate} alt="" />
        </div>
        <div className="flex justify-center space-x-6 mb-4 items-center max-sm:space-x-2 ">
          <button
            onClick={() => launchRazorpay("GooglePay")}
            className="flex flex-col outline-none items-center space-y-1 hover:text-blue-600"
            disabled={loading}
          >
            <SiGooglepay size={40} />
            {/* <span className="text-sm">Google Pay</span> */}
          </button>
          <button
            onClick={() => launchRazorpay("PhonePe")}
            className="flex flex-col items-center  outline-none space-y-1 hover:text-green-600"
            disabled={loading}
          >
            <SiPhonepe size={40} />
            {/* <span className="text-sm">PhonePe</span> */}
          </button>
          <button
            onClick={() => launchRazorpay("PayPal")}
            className="flex flex-col items-center  outline-none space-y-1 hover:text-blue-800"
            disabled={loading}
          >
            <FaPaypal size={40} />
            {/* <span className="text-sm">PayPal</span> */}
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </Popup>
  );
};

export default PaymentModal;
