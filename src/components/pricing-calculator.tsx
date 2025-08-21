"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Pricing data structure
const PRICING_DATA = {
  "10-3": 349,
  "15-3": 425,
  "20-3": 549,
  "30-3": 699,
  "40-3": 799,
  "10-7": 399,
  "15-7": 495,
  "20-7": 649,
  "30-7": 799,
  "40-7": 899,
} as const;

const SIZES = [10, 15, 20, 30, 40];
const DURATIONS = [3, 7];

export function PricingCalculator() {
  const [sizeIndex, setSizeIndex] = useState(0); // Default to 10 yard
  const [durationIndex, setDurationIndex] = useState(0); // Default to 3 days
  const [isOpen, setIsOpen] = useState(false);

  const currentSize = SIZES[sizeIndex];
  const currentDuration = DURATIONS[durationIndex];
  const priceKey = `${currentSize}-${currentDuration}` as keyof typeof PRICING_DATA;
  const currentPrice = PRICING_DATA[priceKey];

  const scrollToBooking = () => {
    const element = document.getElementById("booking");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // Auto-select dumpster service type and focus on Full Name field
      setTimeout(() => {
        // Trigger dumpster selection
        const dumpsterOption = document.querySelector('[data-service-type="dumpster"]') as HTMLElement;
        if (dumpsterOption) {
          dumpsterOption.click();
        }
        
        // Focus on Full Name field after service selection
        setTimeout(() => {
          const nameInput = document.getElementById("name") as HTMLInputElement;
          if (nameInput) {
            nameInput.focus();
          }
        }, 100);
      }, 500);
    }
  };

  const scrollToContact = () => {
    setIsOpen(false); // Close the modal first
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop/Tablet View - Expandable Content */}
      <div className="hidden md:block">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex gap-2">
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                Get Price
              </Button>
            </DialogTrigger>
            <Button onClick={scrollToBooking} className="flex-1">
              Book Now
            </Button>
          </div>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Dumpster Rental Pricing</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Size Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Dumpster Size</label>
                  <span className="text-sm text-gray-600">{currentSize} yard</span>
                </div>
                <Slider
                  value={[sizeIndex]}
                  onValueChange={(value) => setSizeIndex(value[0])}
                  max={4}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10 yd</span>
                  <span>15 yd</span>
                  <span>20 yd</span>
                  <span>30 yd</span>
                  <span>40 yd</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Duration</label>
                  <span className="text-sm text-gray-600">{currentDuration} days</span>
                </div>
                <Slider
                  value={[durationIndex]}
                  onValueChange={(value) => setDurationIndex(value[0])}
                  max={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>3 days</span>
                  <span>7 days</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  ${currentPrice}
                </div>
                <div className="text-sm text-gray-600">
                  {currentSize} yard dumpster • {currentDuration} days
                </div>
              </div>

              {/* Contact Note */}
              <div className="text-xs text-gray-500 text-center border-t pt-3">
                Need longer than 7 days? <button onClick={scrollToContact} className="text-primary font-medium hover:underline">Contact us</button> for custom pricing.
              </div>

              {/* Action Button */}
              <Button onClick={scrollToBooking} className="w-full">
                Book This Dumpster
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile View - Inline Expandable */}
      <div className="md:hidden">
        <MobilePricingCalculator onBook={scrollToBooking} />
      </div>
    </div>
  );
}

function MobilePricingCalculator({ onBook }: { onBook: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [durationIndex, setDurationIndex] = useState(0);

  const currentSize = SIZES[sizeIndex];
  const currentDuration = DURATIONS[durationIndex];
  const priceKey = `${currentSize}-${currentDuration}` as keyof typeof PRICING_DATA;
  const currentPrice = PRICING_DATA[priceKey];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1"
        >
          {isExpanded ? 'Hide Price' : 'Get Price'}
        </Button>
        <Button onClick={onBook} className="flex-1">
          Book Now
        </Button>
      </div>

      {isExpanded && (
        <Card className="mt-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Calculate Price</CardTitle>
            <CardDescription className="text-sm">
              Adjust the sliders to get your estimate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Size</label>
                <span className="text-sm text-gray-600">{currentSize} yard</span>
              </div>
              <Slider
                value={[sizeIndex]}
                onValueChange={(value) => setSizeIndex(value[0])}
                max={4}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Duration</label>
                <span className="text-sm text-gray-600">{currentDuration} days</span>
              </div>
              <Slider
                value={[durationIndex]}
                onValueChange={(value) => setDurationIndex(value[0])}
                max={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>3 days</span>
                <span>7 days</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-primary/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-primary">
                ${currentPrice}
              </div>
              <div className="text-xs text-gray-600">
                {currentSize} yard • {currentDuration} days
              </div>
            </div>

            {/* Contact Note */}
            <div className="text-xs text-gray-500 text-center">
              Need longer than 7 days? <button onClick={scrollToContact} className="text-primary font-medium hover:underline">Contact us</button>.
            </div>

            {/* Book Button */}
            <Button onClick={onBook} size="sm" className="w-full">
              Book This Dumpster
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}