"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      id: "how-rental-works",
      question: "How does the dumpster rental work?",
      answer: (
        <div className="space-y-4">
          <p><strong>1. Ordering:</strong> Select size, schedule delivery date, provide address</p>
          <p><strong>2. Delivery:</strong> Our driver places dumpster in your designated location</p>
          <p><strong>3. Fill Period:</strong> You have your rental period to fill the dumpster</p>
          <p><strong>4. Pickup:</strong> Scheduled pickup on end date or when you call for pickup</p>
          <p><strong>5. Disposal:</strong> We handle proper disposal and recycling</p>
          <div className="mt-4 space-y-2">
            <p><strong>Additional Details:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Same-day and next-day delivery options available</li>
              <li>We need 3 feet clearance on all sides for placement</li>
              <li>Weight limits apply based on dumpster size</li>
              <li>Prohibited items: hazardous materials, electronics, appliances with refrigerants</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "payment-options",
      question: "How do I pay?",
      answer: (
        <div className="space-y-3">
          <p><strong>Online Payment:</strong> Secure credit card processing through our website</p>
          <p><strong>Payment Timing:</strong> Deposit at booking, balance before pickup for dumpster rentals</p>
          <p><strong>Accepted Methods:</strong> All major credit cards (Visa, MasterCard, American Express), digital wallets (Apple Pay, Google Pay)</p>
          <p><strong>Commercial Accounts:</strong> Invoicing available for established business customers</p>
          <p><strong>Refund Policy:</strong> Full refund if cancelled 24 hours before delivery, partial refund based on services provided</p>
        </div>
      )
    },
    {
      id: "service-areas",
      question: "What areas do you serve?",
      answer: (
        <div className="space-y-3">
          <p>We proudly serve the greater Houston metropolitan area, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Houston (all districts)</li>
            <li>Katy</li>
            <li>Sugar Land</li>
            <li>The Woodlands</li>
            <li>Cypress</li>
            <li>Spring</li>
            <li>Pearland</li>
            <li>Pasadena</li>
            <li>League City</li>
            <li>Conroe</li>
          </ul>
          <p className="mt-3"><strong>Not sure if we serve your area?</strong> Call us at (832) 363-0392 or use our booking form - we&apos;ll let you know if we can reach you!</p>
        </div>
      )
    },
    {
      id: "dumpster-sizes",
      question: "What size dumpster do I need?",
      answer: (
        <div className="space-y-4">
          <div>
            <p><strong>10 Yard Dumpster</strong> - Small cleanouts, minor renovations</p>
            <p className="text-gray-600">• Equivalent to 3-4 pickup truck loads</p>
            <p className="text-gray-600">• Perfect for: bathroom remodels, small deck removal, garage cleanouts</p>
          </div>
          <div>
            <p><strong>20 Yard Dumpster</strong> - Medium projects, home cleanouts</p>
            <p className="text-gray-600">• Equivalent to 6-8 pickup truck loads</p>
            <p className="text-gray-600">• Perfect for: kitchen remodels, flooring removal, estate cleanouts</p>
          </div>
          <div>
            <p><strong>30 Yard Dumpster</strong> - Large renovations, construction</p>
            <p className="text-gray-600">• Equivalent to 9-12 pickup truck loads</p>
            <p className="text-gray-600">• Perfect for: whole home cleanouts, major renovations, new construction</p>
          </div>
          <div>
            <p><strong>40 Yard Dumpster</strong> - Major construction, commercial projects</p>
            <p className="text-gray-600">• Equivalent to 12-16 pickup truck loads</p>
            <p className="text-gray-600">• Perfect for: large construction sites, commercial cleanouts, demolition</p>
          </div>
          <p className="mt-4"><strong>Still not sure?</strong> Our team can help you choose the right size based on your project description.</p>
        </div>
      )
    },
    {
      id: "same-day-service",
      question: "Do you offer same-day service?",
      answer: (
        <div className="space-y-3">
          <p><strong>Yes!</strong> We offer same-day service for most of our offerings:</p>
          <p><strong>Dumpster Rentals:</strong> Same-day delivery available for orders placed before 10 AM (subject to availability)</p>
          <p><strong>Junk Removal:</strong> Same-day service available Monday-Saturday</p>
          <p><strong>Emergency Services:</strong> 24/7 emergency cleanup and demolition services</p>
          <p className="mt-3"><strong>Additional charges may apply for same-day service.</strong> Standard delivery is 2-3 business days with no extra fees.</p>
        </div>
      )
    },
    {
      id: "what-can-go-in",
      question: "What can I put in the dumpster?",
      answer: (
        <div className="space-y-4">
          <div>
            <p><strong>✅ Accepted Items:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Construction debris (wood, drywall, concrete, asphalt)</li>
              <li>Household furniture and appliances (without refrigerants)</li>
              <li>Carpet and flooring materials</li>
              <li>Yard waste and landscaping debris</li>
              <li>General household junk and clutter</li>
            </ul>
          </div>
          <div>
            <p><strong>❌ Prohibited Items:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Hazardous materials (paint, chemicals, oil)</li>
              <li>Electronics and batteries</li>
              <li>Refrigerators, freezers, air conditioners</li>
              <li>Tires and automotive fluids</li>
              <li>Medical waste</li>
            </ul>
          </div>
          <p><strong>Have questions about specific items?</strong> Call us at (832) 363-0392 - we&apos;re happy to help!</p>
        </div>
      )
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our waste management services
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-white rounded-lg shadow-sm border px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+1-832-363-0392"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (832) 363-0392
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}