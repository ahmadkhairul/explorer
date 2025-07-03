<script setup lang="ts">
import FileListHeader from './FileListHeader.vue'
import FileList from './FileList.vue'
import CreateFolder from './Modals/CreateFolder.vue'
import DeleteFile from './Modals/DeleteFile.vue'
import RenameFile from './Modals/RenameFile.vue'
import UploadFile from './Modals/UploadFile.vue'
import { useFileExplorer } from '@/composition/useFileExplorer'

const sidebar = defineModel<boolean>()

const {
  firstRender,
  loading,
  files,
  modal,
  newFolderName,
  newFile,
  actions,
  newFileName,
  search,
  createFolder,
  uploadFile,
  editFile,
  deleteFile,
  openModal,
} = useFileExplorer()
</script>

<template>
  <FileListHeader
    v-model="search"
    v-model:sidebar="sidebar"
    v-model:actions="actions"
    @open-modal="openModal"
  />

  <CreateFolder
    v-model="newFolderName"
    :modal="modal"
    :loading="loading"
    @create-folder="createFolder"
    @open-modal="openModal"
  />

  <DeleteFile
    :modal="modal"
    :loading="loading"
    @delete-file="deleteFile"
    @open-modal="openModal"
  />

  <RenameFile
    v-model="newFileName"
    :modal="modal"
    :loading="loading"
    @edit-file="editFile"
    @open-modal="openModal"
  />

  <UploadFile
    v-model="newFile"
    :modal="modal"
    :loading="loading"
    @upload-file="uploadFile"
    @open-modal="openModal"
  />

  <FileList
    :files="files"
    :actions="actions"
    :loading="loading"
    :first-render="firstRender"
    @open-modal="openModal"
  />
</template>

<style scoped>
</style>
