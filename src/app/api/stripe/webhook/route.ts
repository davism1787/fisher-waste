import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId;
  
  if (!bookingId) {
    console.error('No booking ID found in payment intent metadata');
    return;
  }

  // Update booking status to confirmed
  const { error } = await supabase
    .from('bookings')
    .update({
      status: 'confirmed',
      total_amount: paymentIntent.amount / 100 // Convert cents back to dollars
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating booking after payment success:', error);
    return;
  }

  // TODO: Send confirmation email to customer
  // TODO: Send notification to Fisher Waste team
  // TODO: Add to calendar/scheduling system

  console.log(`Payment successful for booking ${bookingId}`);
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  const bookingId = paymentIntent.metadata?.bookingId;
  
  if (!bookingId) {
    console.error('No booking ID found in payment intent metadata');
    return;
  }

  // Optionally update booking status or add failure notes
  const { error } = await supabase
    .from('bookings')
    .update({
      // Keep status as 'pending' to allow retry
      // Could add a payment_failed_at timestamp or failure count
    })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating booking after payment failure:', error);
  }

  // TODO: Send payment failure email to customer
  // TODO: Notify Fisher Waste team of failed payment

  console.log(`Payment failed for booking ${bookingId}`);
}