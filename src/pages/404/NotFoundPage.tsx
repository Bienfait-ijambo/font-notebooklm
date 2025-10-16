// NotFoundPage.jsx
export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn’t exist.</p>
    </div>
  );
}


// // App.jsx or main.jsx
// import React, { useState } from "react";


// import {
//   PaymentElement,
//   Elements,
//   useStripe,
//   useElements,
//   CardElement
// } from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// const stripePromise = loadStripe("pk_test_51HeHxbHpqk1Ix2np4Vf3FJqKFDOfB8G9Aky3LVYnOSlm2bcHnoykHgqG44ULbtu1IUbHkWGJHVqrxRWmhQiH8v5300zemXJziI");

// export default function App() {
//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm />
//     </Elements>
//   );
// }



// function CheckoutForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // 1️⃣ Get payment intent from your backend
//     const res = await fetch("http://localhost:8000/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 1000 }) // in cents ($10.00)
//     });
//     const { clientSecret } = await res.json();

//     // 2️⃣ Confirm the card payment
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardElement),
//       },
//     });

//     if (error) {
//       setError(error.message);
//     } else if (paymentIntent.status === "succeeded") {
//       setSuccess(true);
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       {/* <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
//       <CardElement className="p-2 border rounded-md" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
//       >
//         {loading ? "Processing..." : "Pay $10"}
//       </button>
//       {error && <p className="text-red-600 mt-2">{error}</p>}
//       {success && <p className="text-green-600 mt-2">Payment successful 🎉</p>}
//     </form> */}
// <Kx />
//     </div>



  
//   );
// }

// const Kx = () => {

//   async function addPaymentMethod() {
//   const res = await fetch("http://localhost:8000/create-setup-session", {
//     method: "POST",
//   });
//   const data = await res.json();
//   window.location.href = data.url; // Redirects user to Stripe-hosted form
// }

//   return ( 
    
//   <button
//   onClick={addPaymentMethod}
//   className="bg-blue-600 text-white px-4 py-2 rounded-md"
// >
//   Add Payment Method
// </button>

    
//   );
// }
 
