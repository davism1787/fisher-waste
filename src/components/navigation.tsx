"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
              Fisher Waste Solutions
            </h1>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("services")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-accent"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-accent"
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isScrolled 
                    ? "text-gray-700 hover:text-primary" 
                    : "text-white hover:text-accent"
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => window.location.href = "tel:+1-832-363-0392"}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Call Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors ${
                isScrolled ? "text-gray-700 hover:text-primary" : "text-white hover:text-blue-200"
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 shadow-lg ${
            isScrolled ? "bg-white border-t" : "bg-black/90 backdrop-blur-sm"
          }`}>
            <button
              onClick={() => {
                scrollToSection("services");
                setIsMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                isScrolled 
                  ? "text-gray-700 hover:text-primary hover:bg-gray-50" 
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => {
                scrollToSection("faq");
                setIsMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                isScrolled 
                  ? "text-gray-700 hover:text-primary hover:bg-gray-50" 
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => {
                scrollToSection("contact");
                setIsMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                isScrolled 
                  ? "text-gray-700 hover:text-primary hover:bg-gray-50" 
                  : "text-white hover:text-blue-200 hover:bg-white/10"
              }`}
            >
              Contact
            </button>
            <div className="pt-2">
              <Button
                onClick={() => {
                  window.location.href = "tel:+1-832-363-0392";
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}