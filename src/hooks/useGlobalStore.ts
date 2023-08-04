import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreTypes = {
  theme: "light" | "dark";
};

const store = persist<StoreTypes>(
  (set) => ({
    theme: "light",
  }),
  {
    name: "global",
  }
);

export default create(store);
