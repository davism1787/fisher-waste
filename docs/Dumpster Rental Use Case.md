# Dumpster Rental Scheduling Use Case

## User Story
As a homeowner, I want to schedule a dumpster rental for my renovation project so I can dispose of construction debris efficiently.

## Use Case: Schedule Dumpster Rental

### Actor
- Homeowner (primary user)

### Preconditions
- User has access to internet and web browser
- User knows their project address and timeline

### Main Flow
1. **Navigate to Website**
   - User opens browser and navigates to fisherwaste.com
   - Homepage loads with hero section and navigation

2. **Access Booking System**
   - User clicks "Book Now" or "Get Quote" button
   - Booking interface appears with service selection

3. **Select Service**
   - User selects "Dumpster Rental" from service options
   - User chooses dumpster size (10yd, 20yd, 30yd, or 40yd)

4. **Schedule Delivery**
   - User selects delivery date (minimum 2 days in future)
   - User selects pickup date (based on rental period)
   - System validates availability for selected dates

5. **Provide Location**
   - User enters delivery address
   - User adds special placement instructions if needed

6. **Complete Booking**
   - User reviews service details and pricing
   - User enters contact information (name, email, phone)
   - User processes payment via Stripe
   - User receives booking confirmation

### Postconditions
- Dumpster rental is scheduled for specified dates
- User receives email confirmation with booking details
- Fisher Waste team is notified of new booking
- Payment is processed and receipt is generated

### Alternative Flows
- **Date Unavailable**: System suggests alternative dates
- **Payment Failure**: User can retry payment or contact support
- **Address Issues**: System validates address and requests clarification
- **Alternate Service Selected**: User selects demolition or junk removal services (see seperate use case)

### Business Rules
- Minimum 2-day advance notice required
- Standard rental periods: 7, 14, or 30 days
- Delivery and pickup included in base price
- Weight limits apply based on dumpster size
