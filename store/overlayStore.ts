import { create } from "zustand";

interface OverlayState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

export const useOverlayStore = create<OverlayState>()((set) => ({
  isVisible: false,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));
