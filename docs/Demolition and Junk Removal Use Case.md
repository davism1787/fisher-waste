# Demolition and Junk Removal Use Case

## User Story
As a homeowner or contractor, I want to request demolition or junk removal services so I can get a professional assessment and quote for my project.

## Use Case: Request Demolition or Junk Removal Services

### Actor
- Homeowner or contractor (primary user)
- Sales manager (secondary actor for job inspection)

### Preconditions
- User has access to internet and web browser
- User knows their project address and general scope
- User has photos or description of work needed

### Main Flow
1. **Navigate to Website**
   - User opens browser and navigates to fisherwaste.com
   - Homepage loads with hero section and navigation

2. **Access Service Request**
   - User clicks "Get Quote" or "Request Service" button
   - Service selection interface appears

3. **Select Service Type**
   - User selects either "Demolition Services" or "Junk Removal"
   - User chooses specific service category if applicable

4. **Provide Project Details**
   - User enters project address
   - User describes scope of work (text area)
   - User uploads photos of project area (optional)
   - User specifies urgency/timeline preference

5. **Submit Request**
   - User enters contact information (name, email, phone)
   - User submits service request form
   - System sends confirmation to user

6. **Sales Manager Review**
   - Sales manager receives notification of new request
   - Manager reviews project details and photos
   - Manager contacts customer to schedule inspection

7. **Job Inspection**
   - Sales manager visits site for manual inspection
   - Manager assesses project scope, access, and requirements
   - Manager provides detailed quote and timeline

8. **Service Agreement**
   - Customer reviews quote and terms
   - Customer signs service agreement
   - Payment terms are established (deposit, milestone payments, or full payment)

### Postconditions
- Service request is submitted and logged
- Sales manager is notified for follow-up
- Customer receives confirmation and next steps
- Project is scheduled based on inspection results

### Alternative Flows
- **Service Type Changed**: User switches between demolition and junk removal
- **Inspection Scheduling**: Customer and manager coordinate inspection timing
- **Quote Rejection**: Customer declines quote, request is closed
- **Scope Change**: Project requirements change after initial request

### Business Rules
- Manual inspection required for all demolition and junk removal projects
- No upfront payment until after inspection and quote
- Photos and detailed descriptions improve quote accuracy
- Emergency services available for urgent situations
- Commercial projects may require additional permits or documentation

### Exception Handling
- **Inspection Delays**: System sends reminders to sales manager
- **Customer No-Show**: Manager marks inspection as missed, follows up
- **Project Cancellation**: Customer can cancel request before inspection
- **Scope Mismatch**: Manager can request additional information or photos
