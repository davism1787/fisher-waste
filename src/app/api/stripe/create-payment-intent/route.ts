import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      bookingId,
      amount, // Amount in dollars
      customerEmail,
      customerName,
      metadata = {}
    } = body;

    // Validate required fields
    if (!bookingId || !amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, amount, or customerEmail' },
        { status: 400 }
      );
    }

    // Verify booking exists and belongs to customer
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .eq('customer_email', customerEmail)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found or unauthorized' },
        { status: 404 }
      );
    }

    // Check if booking already has a payment intent
    if (booking.payment_intent_id) {
      return NextResponse.json(
        { error: 'Payment intent already exists for this booking' },
        { status: 400 }
      );
    }

    // Convert amount to cents for Stripe
    const amountInCents = Math.round(amount * 100);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: customerEmail,
      metadata: {
        bookingId: bookingId,
        serviceType: booking.service_type,
        customerEmail: customerEmail,
        ...metadata
      },
      description: `Fisher Waste - ${booking.service_type} service for ${customerName || customerEmail}`,
    });

    // Update booking with payment intent ID and amount
    const { error: updateError } = await supabase
      .from('bookings')
      .update({
        payment_intent_id: paymentIntent.id,
        total_amount: amount
      })
      .eq('id', bookingId);

    if (updateError) {
      console.error('Error updating booking with payment intent:', updateError);
      // Note: In production, you might want to cancel the payment intent here
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}