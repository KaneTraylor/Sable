// stores/useDisputeStore.ts
import { create } from "zustand";

export interface DisputeSelection {
  id: string;
  name: string;
  reason: string;
  instruction: string;
}

export interface DisputeState {
  selected: DisputeSelection[];
  addDispute: (item: DisputeSelection) => void;
  removeDispute: (id: string) => void;
  updateDispute: (id: string, data: Partial<DisputeSelection>) => void;
  reset: () => void;
}

export const useDisputeStore = create<DisputeState>((set) => ({
  selected: [],

  addDispute: (item: DisputeSelection) => {
    set((state) => {
      if (state.selected.length >= 5) return {};
      return { selected: [...state.selected, item] };
    });
  },

  removeDispute: (id: string) => {
    set((state) => ({
      selected: state.selected.filter((i) => i.id !== id),
    }));
  },

  updateDispute: (id: string, data: Partial<DisputeSelection>) => {
    set((state) => ({
      selected: state.selected.map((i) =>
        i.id === id ? { ...i, ...data } : i
      ),
    }));
  },

  reset: () => {
    set({ selected: [] });
  },
}));
