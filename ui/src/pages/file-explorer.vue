<script setup lang="ts">
import type { Ref } from 'vue';
import FileExplorer from "@/components/file-explorer.vue";
import FileTree from "@/components/file-tree.vue";
import { ref } from "vue";
import type { FileProps } from '@/types';
import { getFiles } from '@/services/file';

const showFileTree: Ref<boolean> = ref(true);
const breadcrumb: Ref<FileProps[]> = ref([]);
const loading: Ref<boolean> = ref(false);
const files: Ref<FileProps[]> = ref([]);

const fetchFiles = async (
  id: number | undefined,
  params: {
    name?: string,
    type?: string,
    all?: boolean,
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
  <div class="flex w-screen h-screen">
    <aside class="w-96 flex h-screen flex-col" :class="{ 'file-tree': true, 'hidden': !showFileTree }">
      <div class="p-3 border-r-[1px] border-b-[1px] border-blue-400 h-12">File Explorer</div>
      <div class="p-3 border-r-[1px] border-blue-400 flex-1">
        <FileTree @fetch-files="fetchFiles" @set-breadcrumb="setBreadcrumb" :breadcrumb />
      </div>
    </aside>

    <main class="flex-1" :class="{ 'file-list': true }">
      <FileExplorer :breadcrumb :loading :files :showFileTree @toggle-file-tree="toggleFileTree"
        @set-breadcrumb="setBreadcrumb" @fetch-files="fetchFiles" />
    </main>
  </div>
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
