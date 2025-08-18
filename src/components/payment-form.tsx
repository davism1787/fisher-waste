"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  customerEmail: string;
  customerName: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function CheckoutForm({ bookingId, amount, customerEmail, customerName, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create payment intent when component mounts
    const createPaymentIntent = async () => {
      try {
        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookingId,
            amount,
            customerEmail,
            customerName
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent');
        }

        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        onError(error instanceof Error ? error.message : 'Failed to initialize payment');
      }
    };

    createPaymentIntent();
  }, [bookingId, amount, customerEmail, customerName, onError]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card element not found');
      setIsLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerName,
          email: customerEmail,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      onError(error.message || 'Payment failed');
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Total: ${amount.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 border rounded-lg">
            <CardElement options={cardElementOptions} />
          </div>
          
          <Button
            type="submit"
            disabled={!stripe || !clientSecret || isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            <p>Your payment is secured by Stripe</p>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <span>🔒</span>
              <span>SSL Encrypted</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export function PaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}