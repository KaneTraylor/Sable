// stores/useDisputeStore.ts
import { create } from "zustand";

export type DisputeSelection = {
  id: string;
  name: string;
  reason: string;
  instruction: string;
};

type DisputeState = {
  // what the user has selected so far
  selected: DisputeSelection[];
  addDispute: (item: DisputeSelection) => void;
  removeDispute: (id: string) => void;
  updateDispute: (id: string, data: Partial<DisputeSelection>) => void;
  reset: () => void;

  // which dispute‐style they’ll use on the review page
  style: "fcra" | "metro2" | "ai";
  setStyle: (style: "fcra" | "metro2" | "ai") => void;
};

export const useDisputeStore = create<DisputeState>((set, get) => ({
  // initial selections
  selected: [],

  // only allow up to 5 disputes
  addDispute: (item) =>
    set((state) =>
      state.selected.length < 5
        ? { selected: [...state.selected, item] }
        : state
    ),

  removeDispute: (id) =>
    set((state) => ({
      selected: state.selected.filter((d) => d.id !== id),
    })),

  updateDispute: (id, data) =>
    set((state) => ({
      selected: state.selected.map((d) =>
        d.id === id ? { ...d, ...data } : d
      ),
    })),

  reset: () => set({ selected: [] }),

  // dispute‐style defaults to “fcra”
  style: "fcra",
  setStyle: (style) => set({ style }),
}));
