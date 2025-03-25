<template>
  <div class="folder-explorer">
    <!-- Loading State -->
    <div v-if="loading" class="loading">⏳ Loading...</div>

    <!-- Folder List -->
    <div v-else class="folder-list">
      <FolderItem v-for="file in folders" :breadcrumb :key="file.id" :file="file" @fetch-files="fetchFiles"
        @set-breadcrumb="setBreadcrumb" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FolderItem from "./FileTreeItem.vue";
import { type FileProps } from "../types";
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
import { getFiles } from "../services/api";

const loading: Ref<boolean> = ref(true);
const folders: Ref<FileProps[]> = ref([]);

const emit = defineEmits(["fetch-files", "set-breadcrumb"]);
const { breadcrumb } = defineProps<{ breadcrumb: FileProps[] }>();

const fetchFiles = async (
  id: number | undefined,
) => {
  emit("fetch-files", id)
};

const setBreadcrumb = async (
  newbreadcrumb: FileProps[]
) => {
  emit("set-breadcrumb", newbreadcrumb)
}

const fetchFolder = async () => {
  loading.value = true;
  folders.value = await getFiles(undefined, { type: "folder" });
  loading.value = false;
};

onMounted(fetchFolder());
</script>

<style scoped>
.folder-explorer {
  width: 100%;
  max-width: 300px;
  min-width: 250px;
  overflow-y: auto;
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