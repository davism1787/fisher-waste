# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fisher Waste Solutions marketing website - a conversion-focused platform for waste management services including dumpster rentals, junk removal, and demolition services serving Houston and surrounding areas.

## Technology Stack

- **Frontend**: Next.js with ShadCN UI components and Tailwind CSS
- **Database & Backend**: Supabase (authentication, real-time data, storage)
- **Hosting**: Vercel (CI/CD, edge functions, global CDN)
- **Payments**: Stripe integration
- **Analytics**: Google Analytics 4

## Core Architecture

### Database Schema (Supabase)
Key tables include:
- `bookings` - Service bookings with customer details, dates, pricing
- `availability` - Service availability tracking by date and type

### Primary Services
1. **Dumpster Rental** - Temporary placement with multiple sizes (10yd-40yd)
2. **Junk Removal** - Full-service removal with same-day options
3. **Demolition Services** - Professional demolition with debris removal

### Single Page Structure
1. Navigation header (sticky)
2. Hero section with primary CTA
3. Booking/scheduling interface
4. Border-to-border video/image
5. Services overview
6. FAQ section
7. Contact form
8. Footer

## Development Commands

Since this is a documentation-only repository currently, no build/test commands exist yet. When the Next.js project is initialized, typical commands will be:

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## Key Implementation Requirements

### Performance Targets
- Lighthouse score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Mobile responsiveness: 320px - 1920px+
- WCAG 2.1 AA compliance

### Modern UX Features
- Parallax scrolling for hero background
- Fade-in animations with Intersection Observer
- Sticky navigation with opacity changes
- Smooth scroll behavior between sections
- Progress indicator for scroll position

### Booking System
- Calendar widget for date selection
- Real-time availability checking
- Service type and size selection
- Address validation and special instructions
- Estimated pricing display before payment

### Payment Flow
1. Service selection and scheduling
2. Customer information collection
3. Price calculation display
4. Stripe secure payment processing
5. Booking confirmation and receipt

### Contact & Lead Generation
- Contact form with real-time validation
- Spam protection (reCAPTCHA)
- Email notifications to Fisher Waste team
- Auto-responder to customers

## Content Guidelines

### SEO Focus
- Primary keywords: "dumpster rental [city]", "junk removal [city]", "demolition services"
- LocalBusiness and Service schema markup
- Proper H1-H6 hierarchy

### Messaging Tone
- Professional yet approachable
- Emphasize reliability and local expertise
- Environmental responsibility
- Quick response times and flexibility

## Security & Compliance

- PCI DSS compliance for payment processing
- Form input sanitization
- SQL injection prevention
- XSS protection
- HTTPS enforcement throughout

## Analytics Tracking

Key events to implement:
- Service page visits
- Quote request submissions
- Payment completions
- Phone number clicks
- Form abandonment tracking