import { create } from "zustand";

const useStore = create<{ count: number; addCount: () => void }>((set) => ({
  count: 0,
  addCount: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
