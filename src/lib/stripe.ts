import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';

// Client-side Stripe
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Server-side Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
});

// Pricing calculations
export const calculateDumpsterPrice = (size: string, days: number = 7): number => {
  const basePrices: Record<string, number> = {
    '10': 299,
    '20': 399,
    '30': 499,
    '40': 599
  };

  const dailyRates: Record<string, number> = {
    '10': 25,
    '20': 35,
    '30': 45,
    '40': 55
  };

  const basePrice = basePrices[size] || 0;
  const dailyRate = dailyRates[size] || 0;
  const basePeriod = 7;
  
  if (days <= basePeriod) {
    return basePrice;
  }
  
  const additionalDays = days - basePeriod;
  return basePrice + (additionalDays * dailyRate);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};