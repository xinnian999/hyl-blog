import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreTypes = {
  theme: "light" | "dark";
};

const globalStore = persist<StoreTypes>(
  (set) => ({
    theme: "light",
  }),
  {
    name: "global",
  }
);

export default create(globalStore);
