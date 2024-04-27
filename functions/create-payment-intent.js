require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    try {
      const { shipping_fee, total_amount } = JSON.parse(event.body);
      
      console.log("Total amount:", total_amount);
      console.log("Shipping fee:", shipping_fee);

      const calculateOrderAmount = () => {
        const orderAmount = shipping_fee + total_amount;
        console.log("Calculated order amount:", orderAmount);
        return orderAmount;
        // return Number(orderAmount);
      };

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
        description: 'Software development services',
      });

      console.log("Payment Intent:", paymentIntent);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
  
  return { statusCode: 200, body: "Create payment intent" };
};
