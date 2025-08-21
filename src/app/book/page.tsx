"use client";

import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { BookingSection } from "@/components/booking-section";
import { Footer } from "@/components/footer";

export default function BookPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }>
          <BookingSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}