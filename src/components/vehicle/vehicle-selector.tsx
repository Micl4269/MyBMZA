"use client";

import { useState, useEffect } from "react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MStripeBadge } from "@/components/ui/m-stripe";
import {
  bmwVehicles,
  getSeriesById,
  getYearsForGeneration,
  getGenerationById,
  getModelById,
} from "@/data/bmw-vehicles";
import { BMWGeneration, BMWModel } from "@/types";
import { Car, X, Save, Check, Loader2 } from "lucide-react";
import { useVehicleStore } from "@/store/vehicle-store";
import { toast } from "sonner";

interface VehicleSelectorProps {
  onSelect?: (vehicle: {
    seriesId: string;
    generationId: string;
    modelId: string;
    year: number;
  }) => void;
  compact?: boolean;
  showSaveButton?: boolean;
}

export function VehicleSelector({
  onSelect,
  compact = false,
  showSaveButton = true,
}: VehicleSelectorProps) {
  const { selectedVehicle, setSelectedVehicle, clearSelectedVehicle } =
    useVehicleStore();

  const [seriesId, setSeriesId] = useState(selectedVehicle?.seriesId || "");
  const [generationId, setGenerationId] = useState(
    selectedVehicle?.generationId || ""
  );
  const [modelId, setModelId] = useState(selectedVehicle?.modelId || "");
  const [year, setYear] = useState<number | "">(selectedVehicle?.year || "");

  const [generations, setGenerations] = useState<BMWGeneration[]>([]);
  const [models, setModels] = useState<BMWModel[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [isApplying, setIsApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Update generations when series changes
  useEffect(() => {
    if (seriesId) {
      const series = getSeriesById(seriesId);
      if (series) {
        setGenerations(series.generations);
        // Reset downstream selections
        setGenerationId("");
        setModelId("");
        setYear("");
        setModels([]);
        setYears([]);
      }
    } else {
      setGenerations([]);
      setGenerationId("");
      setModelId("");
      setYear("");
      setModels([]);
      setYears([]);
    }
  }, [seriesId]);

  // Update models when generation changes
  useEffect(() => {
    if (generationId) {
      const generation = generations.find((g) => g.id === generationId);
      if (generation) {
        setModels(generation.models);
        setYears(getYearsForGeneration(generation));
        // Reset downstream selections
        setModelId("");
        setYear("");
      }
    } else {
      setModels([]);
      setYears([]);
      setModelId("");
      setYear("");
    }
  }, [generationId, generations]);

  const handleApply = async () => {
    if (seriesId && generationId && modelId && year) {
      setIsApplying(true);

      // Small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 300));

      const vehicle = {
        seriesId,
        generationId,
        modelId,
        year: Number(year),
      };
      setSelectedVehicle(vehicle);
      onSelect?.(vehicle);

      // Get vehicle display name for toast
      const genData = getGenerationById(generationId);
      const modelData = getModelById(modelId);
      const vehicleName = modelData && genData
        ? `${year} ${modelData.model.name} (${genData.generation.code})`
        : "your vehicle";

      setIsApplying(false);
      setShowSuccess(true);

      toast.success("Vehicle filter applied", {
        description: `Showing parts for ${vehicleName}`,
      });

      // Reset success state after animation
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleClear = () => {
    setSeriesId("");
    setGenerationId("");
    setModelId("");
    setYear("");
    clearSelectedVehicle();
  };

  const isComplete = seriesId && generationId && modelId && year;

  // Auto-apply selection when all fields are complete and showSaveButton is false
  // This is used in the garage page where there's a separate "Save to Garage" button
  useEffect(() => {
    if (!showSaveButton && isComplete) {
      const vehicle = {
        seriesId,
        generationId,
        modelId,
        year: Number(year),
      };
      setSelectedVehicle(vehicle);
      onSelect?.(vehicle);
    }
  }, [seriesId, generationId, modelId, year, showSaveButton, isComplete, setSelectedVehicle, onSelect]);

  const seriesOptions = bmwVehicles.map((s) => ({
    value: s.id,
    label: s.name,
  }));

  const generationOptions = generations.map((g) => ({
    value: g.id,
    label: `${g.code} (${g.yearStart}-${g.yearEnd || "Present"})`,
  }));

  const modelOptions = models.map((m) => ({
    value: m.id,
    label: m.name,
  }));

  const yearOptions = years.map((y) => ({
    value: y.toString(),
    label: y.toString(),
  }));

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2">
        <Car className="h-5 w-5 text-m-blue" />
        <div className="flex items-center gap-1 flex-wrap">
          <select
            value={seriesId}
            onChange={(e) => setSeriesId(e.target.value)}
            className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="">Series</option>
            {seriesOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {seriesId && (
            <>
              <span className="text-muted-foreground">/</span>
              <select
                value={generationId}
                onChange={(e) => setGenerationId(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="">Generation</option>
                {generationOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {generationId && (
            <>
              <span className="text-muted-foreground">/</span>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="">Model</option>
                {modelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </>
          )}

          {modelId && (
            <>
              <span className="text-muted-foreground">/</span>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="">Year</option>
                {yearOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {isComplete && (
          <button
            onClick={handleApply}
            className="ml-auto text-m-blue hover:text-m-blue-dark"
          >
            <Save className="h-4 w-4" />
          </button>
        )}

        {selectedVehicle && (
          <button
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-m-blue/10 flex items-center justify-center">
          <Car className="h-5 w-5 text-m-blue" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Select Your BMW</h3>
          <p className="text-sm text-muted-foreground">
            Find parts that fit your vehicle
          </p>
        </div>
        <MStripeBadge className="ml-auto" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Series"
          placeholder="Select series..."
          options={seriesOptions}
          value={seriesId}
          onChange={(e) => setSeriesId(e.target.value)}
        />

        <Select
          label="Generation"
          placeholder="Select generation..."
          options={generationOptions}
          value={generationId}
          onChange={(e) => setGenerationId(e.target.value)}
          disabled={!seriesId}
        />

        <Select
          label="Model"
          placeholder="Select model..."
          options={modelOptions}
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          disabled={!generationId}
        />

        <Select
          label="Year"
          placeholder="Select year..."
          options={yearOptions}
          value={year.toString()}
          onChange={(e) => setYear(Number(e.target.value))}
          disabled={!modelId}
        />
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <button
          onClick={handleClear}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear selection
        </button>

        {showSaveButton && (
          <Button
            onClick={handleApply}
            disabled={!isComplete || isApplying}
            className={`min-w-[140px] transition-all duration-200 ${
              showSuccess ? "bg-emerald-600 hover:bg-emerald-600" : ""
            }`}
          >
            {isApplying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Applying...
              </>
            ) : showSuccess ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Applied!
              </>
            ) : (
              "Apply Filter"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
