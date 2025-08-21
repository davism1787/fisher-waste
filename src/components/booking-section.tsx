"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ServiceType = "dumpster" | "junk" | "demolition" | "";

export function BookingSection() {
  const [serviceType, setServiceType] = useState<ServiceType>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    startDate: "",
    endDate: "",
    dumpsterSize: "",
    projectDescription: "",
    urgency: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceType,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          startDate: formData.startDate,
          endDate: formData.endDate,
          dumpsterSize: formData.dumpsterSize,
          projectDescription: formData.projectDescription,
          urgency: formData.urgency
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking');
      }

      setSubmitStatus({
        type: 'success',
        message: data.message
      });

      // Reset form after successful submission
      setServiceType("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        startDate: "",
        endDate: "",
        dumpsterSize: "",
        projectDescription: "",
        urgency: ""
      });

    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit booking. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const dumpsterSizes = [
    { value: "10", label: "10 Yard - Small cleanouts, minor renovations" },
    { value: "20", label: "20 Yard - Medium projects, home cleanouts" },
    { value: "30", label: "30 Yard - Large renovations, construction" },
    { value: "40", label: "40 Yard - Major construction, commercial projects" }
  ];

  const urgencyOptions = [
    { value: "standard", label: "Standard (2-3 days)" },
    { value: "priority", label: "Priority (Next day)" },
    { value: "emergency", label: "Emergency (Same day)" }
  ];

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Service
          </h2>
          <p className="text-xl text-gray-600">
            Get started with a quick quote or schedule your service today
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Service Request</CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to you with a quote within 2 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Service Type</Label>
                <div className="grid md:grid-cols-3 gap-4">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      serviceType === "dumpster"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setServiceType("dumpster")}
                    data-service-type="dumpster"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Dumpster Rental</h3>
                      <p className="text-sm text-gray-600">Construction & cleanouts</p>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      serviceType === "junk"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setServiceType("junk")}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H19" />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Junk Removal</h3>
                      <p className="text-sm text-gray-600">Full-service removal</p>
                    </div>
                  </div>

                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      serviceType === "demolition"
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setServiceType("demolition")}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3m0 0l-7 7m7-7l7 7" />
                        </svg>
                      </div>
                      <h3 className="font-semibold">Demolition</h3>
                      <p className="text-sm text-gray-600">Professional demolition</p>
                    </div>
                  </div>
                </div>
              </div>

              {serviceType && (
                <>
                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="(713) 555-0123"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Project Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="1234 Main St, Houston, TX 77001"
                      required
                    />
                  </div>

                  {/* Service-specific fields */}
                  {serviceType === "dumpster" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Delivery Date *</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                            min={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]} // 2 days from now
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">Pickup Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                            min={formData.startDate}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dumpsterSize">Dumpster Size *</Label>
                        <Select value={formData.dumpsterSize} onValueChange={(value) => handleInputChange("dumpsterSize", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select dumpster size" />
                          </SelectTrigger>
                          <SelectContent>
                            {dumpsterSizes.map((size) => (
                              <SelectItem key={size.value} value={size.value}>
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {(serviceType === "junk" || serviceType === "demolition") && (
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Timeline *</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">
                      Project Description {serviceType === "dumpster" ? "(Optional)" : "*"}
                    </Label>
                    <Textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                      placeholder={
                        serviceType === "dumpster"
                          ? "Describe your project and any special placement instructions..."
                          : "Please describe the scope of work, items to be removed, or areas to be demolished..."
                      }
                      rows={4}
                      required={serviceType !== "dumpster"}
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus.type && (
                    <div className={`p-4 rounded-lg ${
                      submitStatus.type === 'success' 
                        ? 'bg-accent/10 border border-accent/20 text-accent' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {submitStatus.type === 'success' ? (
                          <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                        <p className="font-medium">{submitStatus.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        serviceType === "dumpster" ? "Get Quote & Book Now" : "Request Quote & Inspection"
                      )}
                    </Button>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      {serviceType === "dumpster" 
                        ? "Secure online booking with instant confirmation"
                        : "We'll contact you within 2 hours to schedule an inspection"
                      }
                    </p>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}