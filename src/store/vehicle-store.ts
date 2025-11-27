import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectedVehicle {
  seriesId: string;
  generationId: string;
  modelId: string;
  year: number;
}

interface SavedGarageVehicle extends SelectedVehicle {
  id: string;
  nickname?: string;
  isPrimary: boolean;
  createdAt: string;
}

interface VehicleStore {
  selectedVehicle: SelectedVehicle | null;
  garage: SavedGarageVehicle[];
  setSelectedVehicle: (vehicle: SelectedVehicle) => void;
  clearSelectedVehicle: () => void;
  addToGarage: (vehicle: SelectedVehicle, nickname?: string) => void;
  removeFromGarage: (id: string) => void;
  setPrimaryVehicle: (id: string) => void;
  selectFromGarage: (id: string) => void;
}

export const useVehicleStore = create<VehicleStore>()(
  persist(
    (set, get) => ({
      selectedVehicle: null,
      garage: [],

      setSelectedVehicle: (vehicle) => {
        set({ selectedVehicle: vehicle });
      },

      clearSelectedVehicle: () => {
        set({ selectedVehicle: null });
      },

      addToGarage: (vehicle, nickname) => {
        const id = `garage-${Date.now()}`;
        const isFirst = get().garage.length === 0;

        const newVehicle: SavedGarageVehicle = {
          ...vehicle,
          id,
          nickname,
          isPrimary: isFirst,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          garage: [...state.garage, newVehicle],
          selectedVehicle: vehicle,
        }));
      },

      removeFromGarage: (id) => {
        set((state) => {
          const newGarage = state.garage.filter((v) => v.id !== id);
          // If removed vehicle was primary, make first remaining one primary
          if (newGarage.length > 0 && !newGarage.some((v) => v.isPrimary)) {
            newGarage[0].isPrimary = true;
          }
          return { garage: newGarage };
        });
      },

      setPrimaryVehicle: (id) => {
        set((state) => ({
          garage: state.garage.map((v) => ({
            ...v,
            isPrimary: v.id === id,
          })),
        }));
      },

      selectFromGarage: (id) => {
        const vehicle = get().garage.find((v) => v.id === id);
        if (vehicle) {
          set({
            selectedVehicle: {
              seriesId: vehicle.seriesId,
              generationId: vehicle.generationId,
              modelId: vehicle.modelId,
              year: vehicle.year,
            },
          });
        }
      },
    }),
    {
      name: "mybmza-vehicle",
    }
  )
);
