# Fisher Waste Marketing Website
## Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** August 13, 2025  
**Project Type:** Marketing Website  

---

## 1. Executive Summary

Fisher Waste Solutions LLC (Fisher Waste) requires a modern, conversion-focused marketing website to showcase their waste management services and facilitate online bookings. The site will serve as the primary digital touchpoint for customers seeking dumpster rentals in Houston and surrounding areas only.  The site should also expose secondary services like junk removal, and demolition services.

### 1.1 Primary Objectives
- Drive customer understanding of Fisher Waste's value proposition
- Enable seamless online booking and payment processing
- Provide comprehensive information about services
- Generate qualified leads through contact forms
- Establish professional online presence

---

## 2. Technical Architecture

### 2.1 Core Technology Stack
- **Frontend Framework:** NextJS, ShadCN, Tailwind CSS
- **Database & Backend:** Supabase (authentication, real-time data, storage)
- **Hosting & Deployment:** Vercel (CI/CD, edge functions, global CDN)
- **Analytics:** Google Analytics 4 (user tracking, conversion metrics)
- **Payment Processing:** Stripe (secure payment handling)

### 2.2 Performance Requirements
- Lighthouse performance score: 90+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Mobile responsiveness: All devices (320px - 1920px+)
- Accessibility: WCAG 2.1 AA compliance

---

## 3. User Experience & Design Requirements

### 3.1 Single Page Hero Layout
**Structure:**
1. Navigation header (sticky)
2. Hero section with primary CTA
3. Booking/scheduling interface floating here
4. Border to border video or image
5. Services overview
6. FAQ section
7. Contact form
8. Footer


### 3.2 Modern Scrolling Effects
- **Parallax scrolling** for hero background
- **Fade-in animations** for content sections
- **Sticky navigation** with background opacity changes
- **Smooth scroll** behavior between sections
- **Progress indicator** showing scroll position
- **Intersection Observer** for triggering animations

### 3.3 Visual Design Principles
- Clean, professional aesthetic
- High contrast for readability
- Consistent spacing (8px grid system)
- Modern typography (system fonts or web-safe alternatives)
- Strategic use of white space
- Mobile-first responsive design

---

## 4. Core Features & Functionality

### 4.1 Hero Section
**Components:**
- Company logo and navigation
- Compelling headline and value proposition
- Primary CTA button ("Get Quote" or "Book Now")
- Hero image/video showcasing services
- Trust indicators (years in business, service area)

**Content Requirements:**
- Clear messaging about Fisher Waste's expertise
- Geographic service area prominence
- Emergency/same-day service availability

### 4.2 Services Overview
**Three Primary Services:**

#### 4.2.1 Dumpster Rental
- **Description:** Temporary dumpster placement for construction, renovation, and cleanout projects
- **Key Features:** Multiple sizes available, flexible rental periods, delivery and pickup included
- **Pricing Model:** Size-based with duration options
- **Target Audience:** Contractors, homeowners, businesses

#### 4.2.2 Junk Removal
- **Description:** Full-service removal of unwanted items from any location
- **Key Features:** Same-day service, labor included, responsible disposal
- **Pricing Model:** Volume-based or flat-rate options
- **Target Audience:** Homeowners, offices, estate cleanouts

#### 4.2.3 Demolition Services
- **Description:** Professional demolition for structures, interiors, and site preparation
- **Key Features:** Licensed and insured, debris removal included, permit assistance
- **Pricing Model:** Project-based quotes
- **Target Audience:** Contractors, developers, commercial clients

### 4.3 Booking & Scheduling System

#### 4.3.1 Date Selection Interface
**Requirements:**
- Calendar widget for start date selection
- End date selection (for dumpster rentals)
- Real-time availability checking
- Minimum/maximum rental periods
- Holiday and weekend considerations

**Database Schema (Supabase):**
```sql
-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  address TEXT NOT NULL,
  special_instructions TEXT,
  status TEXT DEFAULT 'pending',
  total_amount DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Availability table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  available_slots INTEGER DEFAULT 10,
  service_type TEXT NOT NULL
);
```

#### 4.3.2 Service Configuration
- Service type selection (dropdown/radio buttons)
- Dumpster size options (10yd, 20yd, 30yd, 40yd)
- Location/address input with validation
- Special instructions text area
- Estimated pricing display

### 4.4 Payment Integration (Stripe)

#### 4.4.1 Payment Flow
1. Service selection and scheduling
2. Customer information collection
3. Price calculation and display
4. Secure payment processing via Stripe
5. Booking confirmation and receipt

#### 4.4.2 Stripe Implementation
```javascript
// Stripe configuration
const stripe = Stripe('pk_live_...');
const elements = stripe.elements();

// Payment form handling
const handlePayment = async (bookingDetails) => {
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerName,
          email: customerEmail
        }
      }
    }
  );
};
```

#### 4.4.3 Payment Options
- Credit/debit cards (Visa, MasterCard, American Express)
- Digital wallets (Apple Pay, Google Pay)
- Deposit + balance payment option for larger projects
- Automatic receipt generation and email delivery

---

## 5. FAQ Section

### 5.1 Required FAQ Items

#### 5.1.1 "How does the dumpster rental work?"
**Content:**
1. **Ordering:** Select size, schedule delivery date, provide address
2. **Delivery:** Driver places dumpster in designated location
3. **Fill Period:** Customer has rental period to fill dumpster
4. **Pickup:** Scheduled pickup on end date or customer request
5. **Disposal:** Fisher Waste handles proper disposal and recycling

**Additional Details:**
- Delivery timeframes (same-day, next-day options)
- Placement requirements and restrictions
- Weight limits and overage fees
- Prohibited items list

#### 5.1.2 "How do I pay?"
**Content:**
- **Online Payment:** Secure credit card processing through website
- **Payment Timing:** Deposit at booking, balance before pickup
- **Accepted Methods:** All major credit cards, digital wallets
- **Invoicing:** Available for commercial accounts
- **Refund Policy:** Cancellation terms and conditions

**Implementation:**
- Expandable/collapsible FAQ format
- Search functionality for FAQ items
- Related questions suggestions
- Contact link for unlisted questions

---

## 6. Contact & Lead Generation

### 6.1 Contact Form Requirements
**Fields:**
- Name (required)
- Email (required, validated)
- Phone number (required, formatted)
- Service interested in (dropdown)
- Project description (textarea)
- Preferred contact method (email/phone)
- Timeline/urgency (dropdown)

**Form Handling:**
- Real-time validation
- Spam protection (reCAPTCHA)
- Email notifications to Fisher Waste team
- Auto-responder to customer
- CRM integration capability

### 6.2 Contact Information Display
- Phone number (clickable for mobile)
- Email address
- Business hours
- Service area map
- Emergency contact information

---

## 7. Analytics & Tracking

### 7.1 Google Analytics 4 Setup
**Key Events to Track:**
- Page views and session duration
- Service page visits
- Quote request form submissions
- Payment completions
- Phone number clicks
- Contact form submissions

**Conversion Goals:**
- Booking completion rate
- Quote-to-booking conversion
- Form abandonment points
- Mobile vs desktop performance

### 7.2 Custom Analytics
```javascript
// Custom event tracking
gtag('event', 'booking_initiated', {
  service_type: 'dumpster_rental',
  dumpster_size: '20yd',
  value: estimatedPrice
});

gtag('event', 'payment_completed', {
  transaction_id: bookingId,
  value: totalAmount,
  currency: 'USD'
});
```

---

## 8. Content Strategy

### 8.1 SEO Requirements
- **Primary Keywords:** "dumpster rental [city]", "junk removal [city]", "demolition services"
- **Meta Descriptions:** Compelling, under 160 characters
- **Header Structure:** Proper H1-H6 hierarchy
- **Image Alt Text:** Descriptive for all images
- **Schema Markup:** LocalBusiness and Service schema

### 8.2 Content Tone & Messaging
- Professional yet approachable
- Emphasize reliability and expertise
- Local community focus
- Environmental responsibility
- Quick response times and flexibility

---

## 9. Development Phases

### 9.1 Phase 1: Foundation (Week 1-2)
- Astro project setup and configuration
- Vercel deployment pipeline configuration
- Supabase database design and setup
- Basic page structure and routing
- Responsive design framework implementation

### 9.2 Phase 2: Core Features (Week 3-4)
- Hero section with scrolling effects
- Services information sections
- Basic contact form implementation
- FAQ section development

### 9.3 Phase 3: Booking System (Week 5-6)
- Calendar/date picker integration
- Service selection interface
- Database integration for bookings
- Email notification system

### 9.4 Phase 4: Payment & Polish (Week 7-8)
- Stripe payment integration
- Form validation and error handling
- Analytics implementation
- Performance optimization and testing

---

## 10. Success Metrics

### 10.1 Business Metrics
- **Conversion Rate:** Visitors to bookings (target: 3-5%)
- **Average Order Value:** Revenue per booking
- **Customer Acquisition Cost:** Marketing spend per new customer
- **Form Completion Rate:** Contact form submissions (target: 15%+)

### 10.2 Technical Metrics
- **Page Load Speed:** Under 2 seconds
- **Mobile Usability:** 95%+ mobile-friendly score
- **Uptime:** 99.9% availability
- **Security:** Zero payment processing incidents

### 10.3 User Experience Metrics
- **Bounce Rate:** Under 60%
- **Session Duration:** Average 2+ minutes
- **Pages per Session:** 2.5+ average
- **Return Visitor Rate:** 20%+ monthly

---

## 11. Risk Assessment & Mitigation

### 11.1 Technical Risks
- **Payment Processing Failures:** Implement robust error handling and backup payment methods
- **Database Downtime:** Supabase SLA monitoring and fallback strategies
- **Performance Issues:** Regular performance audits and optimization

### 11.2 Business Risks
- **Competitor Response:** Unique value proposition and superior user experience
- **Seasonal Demand:** Flexible pricing and service offerings
- **Regulatory Changes:** Compliance monitoring and legal review

---

## 12. Maintenance & Updates

### 12.1 Regular Updates
- Monthly content reviews and updates
- Quarterly performance optimization
- Annual design and functionality assessment
- Continuous security monitoring and updates

### 12.2 Support Requirements
- 24/7 website monitoring
- Customer support integration
- Regular backup procedures
- Documentation for future developers

---

## Appendix A: Technical Specifications

### A.1 Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

### A.2 Third-Party Integrations
- **Stripe:** Payment processing API
- **Google Analytics:** GA4 tracking code
- **Google Maps:** Service area visualization
- **Email Service:** Transactional email delivery (via Supabase or SendGrid)

### A.3 Deployment & Hosting Benefits (Vercel)
- **Automatic deployments** from Git repositories
- **Preview deployments** for every pull request
- **Edge functions** for server-side functionality
- **Global CDN** for optimal performance worldwide
- **Built-in analytics** and performance monitoring
- **Zero-config** setup for Astro projects
- **Custom domains** with automatic SSL certificates
- HTTPS enforcement
- Form input sanitization
- SQL injection prevention
- Cross-site scripting (XSS) protection
- PCI DSS compliance for payment processing

---

*This PRD serves as the comprehensive guide for developing the Fisher Waste marketing website. All stakeholders should review and approve before development begins.*