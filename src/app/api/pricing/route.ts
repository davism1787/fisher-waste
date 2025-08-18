import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const size = url.searchParams.get('size');
    const days = parseInt(url.searchParams.get('days') || '7');

    if (size) {
      // Get pricing for specific dumpster size
      const { data: pricing, error } = await supabase
        .from('dumpster_pricing')
        .select('*')
        .eq('size', size)
        .single();

      if (error) {
        console.error('Error fetching pricing:', error);
        return NextResponse.json(
          { error: 'Failed to fetch pricing' },
          { status: 500 }
        );
      }

      if (!pricing) {
        return NextResponse.json(
          { error: 'Pricing not found for specified size' },
          { status: 404 }
        );
      }

      // Calculate total price based on rental period
      const basePeriod = 7; // Base price includes 7 days
      const additionalDays = Math.max(0, days - basePeriod);
      const totalPrice = pricing.base_price + (additionalDays * pricing.per_day_rate);

      return NextResponse.json({
        size: pricing.size,
        basePrice: pricing.base_price,
        perDayRate: pricing.per_day_rate,
        weightLimit: pricing.weight_limit,
        overageFee: pricing.overage_fee,
        rentalDays: days,
        totalPrice: totalPrice,
        priceBreakdown: {
          basePrice: pricing.base_price,
          additionalDays: additionalDays,
          additionalDaysCost: additionalDays * pricing.per_day_rate,
          total: totalPrice
        }
      });

    } else {
      // Get all pricing options
      const { data: allPricing, error } = await supabase
        .from('dumpster_pricing')
        .select('*')
        .order('size', { ascending: true });

      if (error) {
        console.error('Error fetching all pricing:', error);
        return NextResponse.json(
          { error: 'Failed to fetch pricing' },
          { status: 500 }
        );
      }

      // Calculate prices for the specified rental period
      const pricingWithTotals = allPricing?.map(pricing => {
        const basePeriod = 7;
        const additionalDays = Math.max(0, days - basePeriod);
        const totalPrice = pricing.base_price + (additionalDays * pricing.per_day_rate);

        return {
          ...pricing,
          rentalDays: days,
          totalPrice: totalPrice,
          priceBreakdown: {
            basePrice: pricing.base_price,
            additionalDays: additionalDays,
            additionalDaysCost: additionalDays * pricing.per_day_rate,
            total: totalPrice
          }
        };
      }) || [];

      return NextResponse.json({
        pricing: pricingWithTotals,
        rentalDays: days
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}