<script setup>
import FileExplorer from "./components/FileExplorer.vue";
import FileTree from "./components/FileTree.vue";
import { ref } from "vue";

const showFileTree = ref(true);
const fileTreeRef = ref(null);

const toggleFileTree = () => {
  showFileTree.value = !showFileTree.value;
};

const refreshFiles = () => {
  if (fileTreeRef.value) {
    fileTreeRef.value.fetchFiles();
  }
};

</script>

<template>
  <div class="container">
    <aside :class="{ 'file-tree': true, 'hidden': !showFileTree }">
      <FileTree ref="fileTreeRef" />
    </aside>

    <main :class="{ 'file-list': true }" :style="{ width: showFileTree ? '70vw' : '90vw' }">
      <FileExplorer :showFileTree="showFileTree" @toggle-file-tree="toggleFileTree" @refresh-files="refreshFiles" />
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
