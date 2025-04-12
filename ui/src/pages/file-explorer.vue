<script setup lang="ts">
import type { Ref } from 'vue';
import FileExplorer from "@/components/FileExplorer.vue";
import FileTree from "@/components/FileTree.vue";
import { ref } from "vue";
import type { FileProps } from '@/types';
import { getFiles } from '@/services/api';

const showFileTree: Ref<boolean> = ref(true);
const breadcrumb: Ref<FileProps[]> = ref([]);
const loading: Ref<boolean> = ref(true);
const files: Ref<FileProps[]> = ref([]);

const fetchFiles = async (
  id: number | undefined,
  params: {
    name?: string,
    type?: string,
  }
) => {
  loading.value = true;
  files.value = await getFiles(id, params);
  loading.value = false;
};

const toggleFileTree = () => {
  showFileTree.value = !showFileTree.value;
};

const setBreadcrumb = (value: FileProps[]) => {
  breadcrumb.value = value;
}

</script>

<template>
  <div class="container">
    <aside :class="{ 'file-tree': true, 'hidden': !showFileTree }">
      <FileTree @fetch-files="fetchFiles" @set-breadcrumb="setBreadcrumb" :breadcrumb />
    </aside>

    <main :class="{ 'file-list': true }" :style="{ width: showFileTree ? '70vw' : '90vw' }">
      <FileExplorer :breadcrumb :loading :files :showFileTree @toggle-file-tree="toggleFileTree"
        @set-breadcrumb="setBreadcrumb" @fetch-files="fetchFiles" />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

/* Left Sidebar */
.file-tree {
  background: #f4f4f4;
  padding: 90px 15px 0px 15px;
  border-right: 2px solid #ddd;
}

.hidden {
  display: none;
}

/* Right Sidebar */
.file-list {
  min-width: 600px;
  padding: 15px;
}
</style>
