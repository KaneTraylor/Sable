import { create } from "zustand";

export type DisputeSelection = {
  id: string;
  name: string;
  reason: string;
  instruction: string;
};

type DisputeState = {
  selected: DisputeSelection[];
  addDispute: (item: DisputeSelection) => void;
  removeDispute: (id: string) => void;
  updateDispute: (id: string, data: Partial<DisputeSelection>) => void;
  reset: () => void;
};

export const useDisputeStore = create<DisputeState>()((set) => ({
  selected: [],
  addDispute: (item: DisputeSelection) =>
    set((state: DisputeState) =>
      state.selected.length < 5
        ? { selected: [...state.selected, item] }
        : state
    ),
  removeDispute: (id: string) =>
    set((state: DisputeState) => ({
      selected: state.selected.filter((i) => i.id !== id),
    })),
  updateDispute: (id: string, data: Partial<DisputeSelection>) =>
    set((state: DisputeState) => ({
      selected: state.selected.map((i) =>
        i.id === id ? { ...i, ...data } : i
      ),
    })),
  reset: () => set({ selected: [] }),
}));
