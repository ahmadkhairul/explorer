<template>
  <div class="folder-explorer">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="folder-list">
      <FolderItem v-for="file in files" :key="file.id" :file="file" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import FolderItem from "./FileTreeItem.vue";
import { getFiles } from "../services/api";
import { type FileProps } from "../types";

const files: Ref<FileProps[]> = ref([]);
const loading: Ref<boolean> = ref(true);

const fetchFiles = async () => {
  loading.value = true;
  files.value = await getFiles(undefined);
  loading.value = false;
};

onMounted(fetchFiles);

defineExpose({ fetchFiles });
</script>

<style scoped>
/* Container utama folder explorer */
.folder-explorer {
  width: 100%;
  max-width: 300px;
  min-width: 250px;
  overflow-y: auto; /* Tambahkan scrollbar jika folder banyak */
}

/* Loading text */
.loading {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}

/* Folder list */
.folder-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .folder-explorer {
    max-width: 100%;
    min-width: auto;
    height: auto;
    border-right: none;
    border-bottom: 2px solid #ddd;
  }
}
</style>