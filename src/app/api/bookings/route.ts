import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      serviceType,
      name,
      email,
      phone,
      address,
      startDate,
      endDate,
      dumpsterSize,
      projectDescription,
      urgency
    } = body;

    // Validate required fields
    if (!serviceType || !name || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate service-specific requirements
    if (serviceType === 'dumpster') {
      if (!startDate || !dumpsterSize) {
        return NextResponse.json(
          { error: 'Dumpster rentals require start date and size' },
          { status: 400 }
        );
      }
    }

    if ((serviceType === 'junk' || serviceType === 'demolition') && !projectDescription) {
      return NextResponse.json(
        { error: 'Project description is required for junk removal and demolition services' },
        { status: 400 }
      );
    }

    // Check availability for dumpster rentals
    if (serviceType === 'dumpster' && startDate) {
      const { data: availability, error: availabilityError } = await supabase
        .from('availability')
        .select('available_slots')
        .eq('date', startDate)
        .eq('service_type', 'dumpster')
        .single();

      if (availabilityError || !availability || availability.available_slots <= 0) {
        return NextResponse.json(
          { error: 'Selected date is not available' },
          { status: 400 }
        );
      }
    }

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        service_type: serviceType,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        address: address,
        start_date: startDate || null,
        end_date: endDate || null,
        dumpster_size: dumpsterSize || null,
        project_description: projectDescription || '',
        urgency: urgency || 'standard',
        status: 'pending'
      })
      .select()
      .single();

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      return NextResponse.json(
        { error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // Update availability for dumpster rentals
    if (serviceType === 'dumpster' && startDate) {
      const { error: updateError } = await supabase.rpc('decrement_available_slots', {
        target_date: startDate,
        target_service_type: 'dumpster'
      });

      if (updateError) {
        console.error('Availability update error:', updateError);
        // Note: In production, you might want to roll back the booking here
      }
    }

    // TODO: Send confirmation email
    // TODO: Notify Fisher Waste team

    return NextResponse.json({
      success: true,
      booking: booking,
      message: serviceType === 'dumpster' 
        ? 'Booking created successfully! You will receive a confirmation email shortly.'
        : 'Service request submitted successfully! We will contact you within 12 hours to schedule an inspection.'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    return NextResponse.json({ bookings });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}