// Google Analytics 4 implementation

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_TRACKING_ID) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (!GA_TRACKING_ID || typeof window.gtag === 'undefined') return;
  
  window.gtag('event', eventName, parameters);
};

// Predefined event tracking functions
export const trackBookingInitiated = (serviceType: string, dumpsterSize?: string) => {
  trackEvent('booking_initiated', {
    event_category: 'engagement',
    service_type: serviceType,
    dumpster_size: dumpsterSize,
  });
};

export const trackBookingCompleted = (serviceType: string, bookingId: string, amount?: number) => {
  trackEvent('booking_completed', {
    event_category: 'conversion',
    service_type: serviceType,
    booking_id: bookingId,
    value: amount,
    currency: 'USD',
  });
};

export const trackPaymentCompleted = (bookingId: string, amount: number, serviceType: string) => {
  trackEvent('purchase', {
    transaction_id: bookingId,
    value: amount,
    currency: 'USD',
    service_type: serviceType,
  });
};

export const trackContactFormSubmitted = (serviceInterest?: string) => {
  trackEvent('contact_form_submitted', {
    event_category: 'engagement',
    service_interest: serviceInterest,
  });
};

export const trackPhoneClick = () => {
  trackEvent('phone_click', {
    event_category: 'engagement',
    event_label: 'header_phone',
  });
};

export const trackServiceInterest = (serviceType: string) => {
  trackEvent('service_interest', {
    event_category: 'engagement',
    service_type: serviceType,
  });
};

export const trackQuoteRequest = (serviceType: string) => {
  trackEvent('quote_request', {
    event_category: 'engagement',
    service_type: serviceType,
  });
};

export const trackFormAbandonment = (formType: string, step: string) => {
  trackEvent('form_abandonment', {
    event_category: 'engagement',
    form_type: formType,
    abandonment_step: step,
  });
};