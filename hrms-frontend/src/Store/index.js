import { create } from "zustand";
import { createEmployessSlice } from "./Slice/useEmployees";

export const useAppStore = create()((...a) => ({
  ...createEmployessSlice(...a),
}));
