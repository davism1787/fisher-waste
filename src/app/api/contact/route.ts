import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      serviceInterest,
      message,
      contactMethod
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create contact submission
    const { error: submissionError } = await supabase
      .from('contact_submissions')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        service_interest: serviceInterest || null,
        message: message.trim(),
        contact_method: contactMethod || 'email',
        status: 'new'
      });

    if (submissionError) {
      console.error('Contact submission error:', submissionError);
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email to customer
    // TODO: Send notification email to Fisher Waste team
    // TODO: Add to CRM system if configured

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 12 hours during business hours.'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}