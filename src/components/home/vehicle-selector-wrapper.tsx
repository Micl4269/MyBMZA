"use client";

import dynamic from "next/dynamic";

// Lazy load vehicle selector to reduce initial JS bundle
const VehicleSelector = dynamic(
  () => import("@/components/vehicle/vehicle-selector").then((mod) => mod.VehicleSelector),
  {
    loading: () => (
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-4 w-48 bg-muted rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    ),
    ssr: false,
  }
);

export function VehicleSelectorWrapper() {
  return <VehicleSelector />;
}
