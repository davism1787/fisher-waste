"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "sticky-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className={`text-2xl font-bold transition-colors ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              Fisher Waste
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-blue-200"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-blue-200"
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-blue-200"
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-blue-200"
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="tel:+1-713-555-0123" 
              className={`font-medium transition-colors ${
                isScrolled 
                  ? "text-gray-700 hover:text-primary" 
                  : "text-white hover:text-blue-200"
              }`}
            >
              (713) 555-0123
            </a>
            <Button
              onClick={() => scrollToSection("booking")}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className={`transition-colors ${
                isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-blue-200"
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}