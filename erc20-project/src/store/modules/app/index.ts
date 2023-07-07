import { defineStore } from "pinia";
import piniaStore from "@/store/index";
import { AppState } from "./types";

export const useAppStore = defineStore(
  // 唯一ID
  "app",
  {
    state: () => ({
      title: "",
      h1: "",
      theme: "",
    }),
    getters: {},
    actions: {
      updateSettings(partial: Partial<AppState>) {
        this.$patch(partial);
      },

      // Change theme color
      toggleTheme(dark: boolean) {
        if (dark) {
          this.theme = "dark";
          document.documentElement.classList.add("dark");
          document.body.setAttribute("arco-theme", "dark");
        } else {
          this.theme = "light";
          document.documentElement.classList.remove("dark");
          document.body.removeAttribute("arco-theme");
        }
      },
    },
    persist: {
      key: "theme",
      storage: localStorage,
      paths: ["theme"],
    },
  }
);

export function useAppOutsideStore() {
  return useAppStore(piniaStore);
}
