"use client";

import { useState } from "react";
import Link from "next/link";
import { VehicleSelector } from "@/components/vehicle/vehicle-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MStripe } from "@/components/ui/m-stripe";
import { Badge } from "@/components/ui/badge";
import { useVehicleStore } from "@/store/vehicle-store";
import {
  getSeriesById,
  getGenerationById,
  getModelById,
  formatVehicleString,
} from "@/data/bmw-vehicles";
import {
  Car,
  Plus,
  Trash2,
  Star,
  ChevronRight,
  Check,
  Edit2,
} from "lucide-react";

export default function GaragePage() {
  const {
    selectedVehicle,
    garage,
    addToGarage,
    removeFromGarage,
    setPrimaryVehicle,
    selectFromGarage,
  } = useVehicleStore();

  const [isAdding, setIsAdding] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleSaveToGarage = () => {
    if (selectedVehicle) {
      addToGarage(selectedVehicle, nickname || undefined);
      setNickname("");
      setIsAdding(false);
    }
  };

  const getVehicleDisplay = (vehicle: {
    seriesId: string;
    generationId: string;
    modelId: string;
    year: number;
  }) => {
    const series = getSeriesById(vehicle.seriesId);
    const genData = getGenerationById(vehicle.generationId);
    const modelData = getModelById(vehicle.modelId);

    if (!series || !genData || !modelData) return "Unknown Vehicle";

    return formatVehicleString(
      series,
      genData.generation,
      modelData.model,
      vehicle.year
    );
  };

  const isCurrentlySelected = (vehicle: {
    seriesId: string;
    generationId: string;
    modelId: string;
    year: number;
  }) => {
    if (!selectedVehicle) return false;
    return (
      selectedVehicle.seriesId === vehicle.seriesId &&
      selectedVehicle.generationId === vehicle.generationId &&
      selectedVehicle.modelId === vehicle.modelId &&
      selectedVehicle.year === vehicle.year
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">My Garage</span>
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-b from-m-blue/5 to-background py-12">
        <div className="container mx-auto px-4">
          <MStripe size="sm" className="w-20 mb-4" />
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">My Garage</h1>
          <p className="text-muted-foreground max-w-2xl">
            Save your BMW vehicles for quick fitment checking. Select a vehicle
            to automatically filter products that fit your car.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Vehicles */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Saved Vehicles</h2>
              {!isAdding && (
                <Button onClick={() => setIsAdding(true)} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vehicle
                </Button>
              )}
            </div>

            {garage.length === 0 && !isAdding ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">
                  No vehicles saved yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Add your BMW to get personalized fitment information
                </p>
                <Button onClick={() => setIsAdding(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Vehicle
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {garage.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className={`bg-card border rounded-xl p-4 transition-colors ${
                      isCurrentlySelected(vehicle)
                        ? "border-m-blue bg-m-blue/5"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isCurrentlySelected(vehicle)
                              ? "bg-m-blue text-white"
                              : "bg-secondary"
                          }`}
                        >
                          <Car className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {vehicle.nickname || getVehicleDisplay(vehicle)}
                            </h3>
                            {vehicle.isPrimary && (
                              <Badge variant="m-blue" size="sm">
                                Primary
                              </Badge>
                            )}
                            {isCurrentlySelected(vehicle) && (
                              <Badge variant="success" size="sm">
                                <Check className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            )}
                          </div>
                          {vehicle.nickname && (
                            <p className="text-sm text-muted-foreground">
                              {getVehicleDisplay(vehicle)}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isCurrentlySelected(vehicle) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => selectFromGarage(vehicle.id)}
                          >
                            Select
                          </Button>
                        )}
                        {!vehicle.isPrimary && (
                          <button
                            onClick={() => setPrimaryVehicle(vehicle.id)}
                            className="p-2 text-muted-foreground hover:text-amber-500 transition-colors"
                            title="Set as primary"
                          >
                            <Star className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => removeFromGarage(vehicle.id)}
                          className="p-2 text-muted-foreground hover:text-m-red transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Vehicle Form */}
            {isAdding && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Add New Vehicle</h3>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setNickname("");
                    }}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>

                <VehicleSelector showSaveButton={false} />

                <Input
                  label="Nickname (Optional)"
                  placeholder="e.g., Daily Driver, Track Car"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />

                <Button
                  onClick={handleSaveToGarage}
                  disabled={!selectedVehicle}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Save to Garage
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Currently Selected */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Car className="h-5 w-5 text-m-blue" />
                Currently Filtering For
              </h3>

              {selectedVehicle ? (
                <div>
                  <p className="font-medium mb-2">
                    {getVehicleDisplay(selectedVehicle)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Products will show fitment compatibility for this vehicle
                  </p>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Browse Compatible Parts
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">
                    No vehicle selected. Select a vehicle to filter products by
                    fitment.
                  </p>
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-secondary/50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Tips</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-m-blue mt-0.5 flex-shrink-0" />
                  <span>
                    Set a primary vehicle for quick access across the site
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-m-blue mt-0.5 flex-shrink-0" />
                  <span>
                    Products will show "Fits" or "No Fit" badges based on your
                    selection
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-m-blue mt-0.5 flex-shrink-0" />
                  <span>
                    Save multiple vehicles if you own more than one BMW
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
