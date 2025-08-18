import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const serviceType = url.searchParams.get('serviceType') || 'dumpster';
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    // Validate service type
    if (!['dumpster', 'junk', 'demolition'].includes(serviceType)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('availability')
      .select('date, available_slots')
      .eq('service_type', serviceType)
      .gte('date', startDate || new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (endDate) {
      query = query.lte('date', endDate);
    } else {
      // Default to next 30 days if no end date specified
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      query = query.lte('date', thirtyDaysFromNow.toISOString().split('T')[0]);
    }

    const { data: availability, error } = await query;

    if (error) {
      console.error('Error fetching availability:', error);
      return NextResponse.json(
        { error: 'Failed to fetch availability' },
        { status: 500 }
      );
    }

    // For dumpster rentals, filter out dates with no availability
    const availableSlots = serviceType === 'dumpster' 
      ? availability?.filter(slot => slot.available_slots > 0) || []
      : availability || [];

    return NextResponse.json({ 
      availability: availableSlots,
      serviceType 
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}