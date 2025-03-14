<template>
  <div>
    <!-- Folder Item -->
    <div class="folder" @click="toggle(file.id)">
      <span v-if="file.type === 'folder'">{{ isOpen ? "📂" : "📁" }} </span>
      <span v-else>📄</span>
      {{ file.name }}
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">⏳ Loading...</div>

    <!-- Child Items (Sub-Folders & Files) -->
    <transition name="fade">
      <div class="child-items" v-if="isOpen && file.type === 'folder'">
        <FileTreeItem v-for="child in childList" :key="child.id" :file="child" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import type { FileProps } from "../types";
import { getFiles } from "../services/api";

const { file } = defineProps<{ file: FileProps }>();

const childList: Ref<FileProps[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const isOpen: Ref<boolean> = ref(false);
const isFetched: Ref<boolean> = ref(false); // ✅ Prevents redundant API calls

const toggle = async (id: number) => {
  if (file.type === 'file') return; // Skip if no child

  isOpen.value = !isOpen.value;

  if (!isFetched.value) {
    loading.value = true;
    childList.value = await getFiles(id);
    loading.value = false;
    isFetched.value = true; // ✅ Only fetch once
  }
};
</script>

<style scoped>
/* Folder Container */
.folder {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.folder:hover {
  background: #e0e0e0;
}

/* Loading Animation */
.loading {
  margin-left: 20px;
  font-size: 12px;
  color: #646cff;
}

/* Child Folders */
.child-items {
  margin-left: 20px;
  border-left: 2px dashed #ddd;
  padding-left: 10px;
}

/* Animasi Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .folder {
    font-size: 14px;
  }
  .child-items {
    margin-left: 10px;
    padding-left: 5px;
  }
}
</style>
