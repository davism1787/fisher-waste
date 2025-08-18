"use client";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">Fisher Waste Solutions</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional waste management services in Houston and surrounding areas. 
              Licensed, insured, and committed to responsible disposal practices.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+1-713-555-0123" className="text-primary hover:text-primary/80 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
              <a href="mailto:info@fisherwaste.com" className="text-primary hover:text-primary/80 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Dumpster Rental
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Junk Removal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Demolition Services
                </button>
              </li>
              <li>
                <a href="tel:+1-713-555-0123" className="text-gray-300 hover:text-white transition-colors">
                  Emergency Services
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a href="tel:+1-713-555-0123" className="text-gray-300 hover:text-white transition-colors">
                  Get Quote
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Service Areas */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
          <p className="text-gray-300 mb-4">
            Proudly serving the greater Houston metropolitan area:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm text-gray-400">
            <span>Houston</span>
            <span>Katy</span>
            <span>Sugar Land</span>
            <span>The Woodlands</span>
            <span>Cypress</span>
            <span>Spring</span>
            <span>Pearland</span>
            <span>Pasadena</span>
            <span>League City</span>
            <span>Conroe</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} Fisher Waste Solutions LLC. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
            <span>Licensed & Insured</span>
            <span>•</span>
            <span>TXDOT Permit #12345</span>
            <span>•</span>
            <span>EPA Compliant</span>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-red-200 font-medium">24/7 Emergency Services Available</p>
              <p className="text-red-300 text-sm">
                For urgent waste management needs, call <a href="tel:+1-713-555-0123" className="underline">(713) 555-0123</a> and follow prompts for emergency service
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}