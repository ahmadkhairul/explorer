// stores/firstRender.ts
import { defineStore } from 'pinia';

export const useFirstRenderStore = defineStore('firstRender', {
  state: () => ({
    isFirstRender: true,
  }),
  actions: {
    setFirstRender(value: boolean) {
      this.isFirstRender = value;
    }
  }
});