<template>
  <div class="file-explorer">
    <!-- File List Header (Search & Buttons) -->
    <div class="file-list-header">
      <div class="file-button-container">
        <button @click="$emit('toggle-file-tree')">
          {{ showFileTree ? "Hide" : "Show" }}
        </button>
        <button @click="openModal(undefined, 'new-folder')" :disabled="searchQuery.length > 0">📁 folder ➕</button>
        <button @click="openModal(undefined, 'new-file')" :disabled="searchQuery.length > 0">📄 files ➕</button>
        <button @click="showActions = !showActions">⚙️ action</button>
      </div>
      <input v-model="searchQuery" placeholder="🔍 Search files..." />
    </div>

    <!-- Create New Folder -->
    <Modal :isOpen="isModalOpen === 'new-folder'" title="Create New Folder"
      @close="isModalOpen = null; folderName = '';">
      <div class="modal-content">
        <input v-model="folderName" placeholder="Folder Name" />
        <button @click="createFolder" :disabled="folderName.length < 1">Create</button>
      </div>
    </Modal>

    <!-- Upload New File -->
    <Modal :isOpen="isModalOpen === 'new-file'" title="Upload New Files"
      @close="isModalOpen = null; selectedFile = null;">
      <div class="modal-content">
        <input @change="handleFileUpload" type="file" />
        <button @click="uploadFiles" :disabled="!selectedFile">Upload</button>
      </div>
    </Modal>

    <!-- Modal Rename File -->
    <Modal :isOpen="isModalOpen === 'rename-file'" title="Rename File" @close="isModalOpen = null; newFileName = ''">
      <div class="modal-content">
        <input v-model="newFileName" placeholder="New File Name" />
        <button @click="editFile" :disabled="newFileName.length < 1">Rename</button>
      </div>
    </Modal>

    <!-- Modal Delete File -->
    <Modal :isOpen="isModalOpen === 'delete-file'" title="Delete File" @close="isModalOpen = null">
      <div class="modal-content">
        <p>Are you sure you want to delete this file? file inside folder will be deleted as well</p>
        <button @click="deleteFile">Delete</button>
      </div>
    </Modal>

    <!-- File List Breacrumbs -->
    <div class="breadcrumb">
      <span @click="onBreadcrumbClick(-1)">Home</span> {{ breadcrumb && breadcrumb.length > 0 ? ' > ' : '' }}
      <template v-for="(item, index) in breadcrumb">
        <span @click="onBreadcrumbClick(index)">{{ item.name }}</span>
        <span v-if="index < breadcrumb.length - 1"> > </span>
      </template>
    </div>

    <div v-if="loading" class="loading">⏳ Loading...</div>

    <!-- File List -->
    <div class="container-file" v-else>
      <div class="container-item" v-for="file in files" :key="file.id">
        <div class="container-item" @click="fetchFilesDetail(file)">
          <div v-if="file.type === 'folder'">📁</div>
          <div v-else>📄</div>
          <p class="ellipsis">{{ file.name }}</p>
        </div>
        <div class="file-actions" v-if="showActions">
          <span @click="openModal(file, 'rename-file')">✏️</span>
          <span @click="openModal(file, 'delete-file')">🗑️</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import type { Ref } from 'vue';
import { getFiles, upsertFile, updateFile, destroyFile } from "../services/api";
import { type FileProps } from "../types";
import Modal from "../elements/Modal.vue";

const breadcrumb: Ref<FileProps[]> = ref([]);
const files: Ref<FileProps[]> = ref([]);
const loading: Ref<boolean> = ref(true);
const searchQuery: Ref<string> = ref("");
const isModalOpen: Ref<string | null> = ref(null);
const folderName: Ref<string> = ref("");
const selectedFile: Ref<File | null> = ref(null);
const showActions: Ref<boolean> = ref(false);
const newFileName: Ref<string> = ref("");
const selectedData: Ref<FileProps | null> = ref(null);
const emit = defineEmits(["refresh-files", "toggle-file-tree"]);

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

let timeout: number | undefined = undefined;

const { showFileTree } = defineProps<{ showFileTree: boolean }>();

const fetchFiles = async () => {
  loading.value = true;
  files.value = await getFiles(undefined, { name: searchQuery.value });
  loading.value = false;
  if (searchQuery.value) {
    breadcrumb.value = [];
  }
};

const fetchFilesDetail = async (file: FileProps) => {
  if (file.type === 'folder') {
    loading.value = true;
    files.value = await getFiles(file.id, {});
    breadcrumb.value.push(file);
    loading.value = false;
  }
};

const onBreadcrumbClick = async (index: number) => {
  breadcrumb.value = breadcrumb.value.slice(0, index + 1);
  if (index === -1) {
    searchQuery.value = "";
    fetchFiles();
    return;
  } else {
    loading.value = true;
    files.value = await getFiles(breadcrumb.value[index].id, {});
    loading.value = false;
  }
};

const createFolder = async () => {
  await upsertFile({
    name: folderName.value,
    type: "folder",
    parent_id: breadcrumb.value.length > 0 ? breadcrumb.value[breadcrumb.value.length - 1].id : undefined,
    size: 0
  });

  if (breadcrumb.value.length > 0) {
    loading.value = true;
    files.value = await getFiles(breadcrumb.value[breadcrumb.value.length - 1].id, {});
    loading.value = false;
  } else {
    fetchFiles();
  }
  folderName.value = "";
  isModalOpen.value = null;
  emit('refresh-files');
};

const uploadFiles = async () => {
  if (selectedFile.value) {
    await upsertFile({
      name: selectedFile.value.name,
      type: "file",
      parent_id: breadcrumb.value.length > 0 ? breadcrumb.value[breadcrumb.value.length - 1].id : undefined,
      size: selectedFile.value.size
    });

    if (breadcrumb.value.length > 0) {
      loading.value = true;
      files.value = await getFiles(breadcrumb.value[breadcrumb.value.length - 1].id, {});
      loading.value = false;
    } else {
      fetchFiles();
    }
    selectedFile.value = null;
    isModalOpen.value = null;
    emit('refresh-files');
  }
};

const editFile = async () => {
  if (selectedData.value) {
    await updateFile(selectedData.value.id, {
      name: newFileName.value,
    });

    if (breadcrumb.value.length > 0) {
      loading.value = true;
      files.value = await getFiles(breadcrumb.value[breadcrumb.value.length - 1].id, {});
      loading.value = false;
    } else {
      fetchFiles();
    }
    newFileName.value = "";
    isModalOpen.value = null;
    emit('refresh-files');
  }
};

const deleteFile = async () => {
  if (selectedData.value) {
    await destroyFile(selectedData.value.id);

    if (breadcrumb.value.length > 0) {
      loading.value = true;
      files.value = await getFiles(breadcrumb.value[breadcrumb.value.length - 1].id, {});
      loading.value = false;
    } else {
      fetchFiles();
    }

    isModalOpen.value = null;
    emit('refresh-files');
  }
};

const openModal = (file: FileProps | undefined, modalName: string) => {
  if (file) {
    selectedData.value = file;
  }
  isModalOpen.value = modalName;
};

watch(searchQuery, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fetchFiles();
  }, 500);
});

onMounted(fetchFiles);
</script>

<style scoped>
.file-explorer {
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 15px;
}

/* Header Layout */
.file-list-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

/* Button Container */
.file-button-container {
  display: flex;
  gap: 10px;
}

/* Input Field */
input {
  flex-grow: 1;
  min-width: 200px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #646cff;
}

/* File Container */
.container-file {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
}

/* File Item */
.container-item {
  width: calc(25% - 10px);
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;
  height: 20px;
  border-radius: 5px;
}

.container-item:hover {
  background: #e6e6e6;
}

/* Loading State */
.loading {
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
}

.breadcrumb {
  margin-bottom: 10px;
  cursor: pointer;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.file-actions {
  width: 100px;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}

.file-actions span {
  cursor: pointer;
  border: 0.5px solid #646cff;
  border-radius: 5px;
}

/* Responsive Adjustments */
@media (max-width: 1024px) {
  .container-item {
    width: calc(33.33% - 10px);
    /* 3 columns */
  }
}

@media (max-width: 768px) {
  .container-item {
    width: calc(50% - 10px);
    /* 2 columns */
  }

  .file-list-header {
    flex-direction: column;
    align-items: stretch;
  }

  .file-button-container {
    justify-content: center;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .container-item {
    width: 100%;
    /* 1 column */
  }

  input {
    width: 100%;
  }
}
</style>
