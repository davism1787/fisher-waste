# Fisher Waste Solutions - Marketing Website

A modern, conversion-focused marketing website for Fisher Waste Solutions, a Houston-based waste management company offering dumpster rentals, junk removal, and demolition services.

## 🚀 Technology Stack

- **Frontend**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS with ShadCN UI components
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel

## 🎨 Design Features

- Airtasker-inspired modern design with clean aesthetics
- Responsive mobile-first layout
- Parallax scrolling effects in hero section
- Smooth scroll navigation between sections
- Sticky navigation with backdrop blur
- Intersection Observer animations
- Professional color scheme with primary blue (#0A65FC)

## 🔧 Key Features

### Service Offerings
1. **Dumpster Rental** - Online booking with size selection and date picker
2. **Junk Removal** - Service request form with inspection scheduling
3. **Demolition Services** - Quote request with project description

### Booking System
- Dual-flow booking: Direct dumpster rental vs. consultation for other services
- Real-time availability checking
- Automated pricing calculation
- Secure Stripe payment processing
- Email confirmations and notifications

### Contact & Lead Generation
- Multi-step contact forms with validation
- Service interest tracking
- Preferred contact method selection
- Auto-responder system

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── bookings/       # Booking API endpoints
│   │   ├── contact/        # Contact form API
│   │   ├── availability/   # Availability checking
│   │   ├── pricing/        # Dumpster pricing
│   │   └── stripe/         # Payment processing
│   ├── globals.css         # Global styles with custom utilities
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main landing page
├── components/
│   ├── ui/                 # ShadCN UI components
│   ├── analytics.tsx       # Google Analytics setup
│   ├── booking-section.tsx # Service booking form
│   ├── contact-section.tsx # Contact form
│   ├── faq-section.tsx     # FAQ accordion
│   ├── footer.tsx          # Site footer
│   ├── hero-section.tsx    # Hero with parallax
│   ├── navigation.tsx      # Sticky navigation
│   ├── payment-form.tsx    # Stripe payment form
│   └── services-section.tsx # Services overview
└── lib/
    ├── analytics.ts        # GA4 event tracking
    ├── stripe.ts           # Stripe configuration
    ├── supabase.ts         # Database client
    └── utils.ts            # Utility functions
```

## 🗄️ Database Schema

### Tables
- `bookings` - Service bookings with customer details
- `contact_submissions` - Lead generation form submissions
- `availability` - Service availability tracking
- `dumpster_pricing` - Pricing configuration

See `database.sql` for complete schema and setup.

## 🛠️ Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID=your_ga_tracking_id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Supabase:**
   - Create a new Supabase project
   - Run the SQL schema from `database.sql`
   - Configure Row Level Security policies

3. **Configure Stripe:**
   - Create Stripe account and get API keys
   - Set up webhook endpoint for payment confirmations

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📈 Analytics & Tracking

The site includes comprehensive Google Analytics 4 tracking:

- Page views and session tracking
- Service interest events
- Booking initiation and completion
- Contact form submissions
- Phone number clicks
- Payment completion events

## 💳 Payment Processing

Secure payment processing via Stripe:

- Dumpster rentals can be paid online immediately
- Supports all major credit cards and digital wallets
- Automatic receipt generation
- Webhook handling for payment confirmations
- PCI DSS compliant

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-optimized interface
- Fast loading on all devices
- Optimized images and assets
- Progressive enhancement

## 🔒 Security Features

- Row Level Security (RLS) in Supabase
- Input validation on all forms
- SQL injection prevention
- XSS protection
- HTTPS enforcement
- Secure payment processing

## 🚀 Deployment

Deploy to Vercel:

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on git push**

The site is optimized for Vercel's edge functions and global CDN.

## 📊 Performance Targets

- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- WCAG 2.1 AA accessibility compliance

## 🛠️ Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📧 Business Integration

The website includes integration points for:

- Email notifications (customer confirmations)
- Team notifications (new bookings/contacts)
- CRM integration capability
- Calendar/scheduling system integration
- Inventory management for dumpster availability

## 🎯 Conversion Optimization

Key conversion optimization features:

- Clear call-to-action buttons
- Trust indicators (licensed, insured, years in business)
- Service area prominence
- Emergency service availability
- Transparent pricing display
- Customer testimonials placement (ready for integration)
- Form abandonment tracking

## 📞 Contact Information

- **Phone**: (713) 555-0123
- **Email**: info@fisherwaste.com
- **Service Area**: Greater Houston Metropolitan Area
- **Emergency Services**: Available 24/7

---

Built with ❤️ for Fisher Waste Solutions LLC
