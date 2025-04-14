// stores/firstRender.ts
import { defineStore } from 'pinia';

export const useFolderIDStore = defineStore('firstRender', {
  state: () => ({
    folderID: 0,
  }),
  actions: {
    setFolderID(value: number) {
      this.folderID = value;
    }
  }
});