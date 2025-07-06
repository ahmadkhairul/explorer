import { ref, watch, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { upsertFile, updateFile, destroyFile, getFiles } from '@/services/file'
import { useFileTreeStore } from '@/stores/file-tree'
import { storeToRefs } from 'pinia'
import type { FileProps } from '@/types/files'

export function useFileExplorer() {
  const firstRender: Ref<boolean> = ref(true) // Show "please select folder" on first render
  const loading: Ref<boolean> = ref(false) // Indicates loading state
  const error: Ref<unknown> = ref(null) // Stores API error

  const files: Ref<FileProps[] | null> = ref(null) // List of files/folders
  const modal: Ref<string | null> = ref(null) // Modal type: 'create', 'delete', etc

  const newFolder: Ref<string> = ref('') // Input for creating new folder
  const newFileName: Ref<string> = ref('') // Input for renaming file/folder
  const newFile: Ref<File | null> = ref(null) // File to be uploaded

  const selectedData: Ref<FileProps | null> = ref(null) // File/folder selected for edit/delete
  const actions: Ref<boolean> = ref(false) // Toggle for showing edit/delete actions
  const search: Ref<string> = ref('') // Search query string

  const fileTree = useFileTreeStore()
  const { selected } = storeToRefs(fileTree)
  const { addItem, updateItem, deleteItem } = fileTree

  let timeout: ReturnType<typeof setTimeout> | undefined

  async function fetchfiles(
    id?: number,
    params: { name?: string; type?: string; all?: boolean } = {}
  ) {
    try {
      loading.value = true
      files.value = await getFiles(id, params)
      if (firstRender.value) firstRender.value = false
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function refetchfiles() {
    await fetchfiles(selected.value?.id)
    newFolder.value = ''
    newFile.value = null
    newFileName.value = ''
    modal.value = null
  }

  async function createFolder() {
    try {
      loading.value = true
      const result = await upsertFile({
        name: newFolder.value,
        parent_id: selected.value?.id
      })
      addItem(result as FileProps)
      await refetchfiles()
    } catch (err: unknown) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function uploadFile() {
    try {
      if (!newFile.value) return
      loading.value = true
      await upsertFile({
        file: newFile.value,
        parent_id: selected.value?.id
      })
      await refetchfiles()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function editFile() {
    try {
      if (!selectedData.value) return
      loading.value = true
      const result = await updateFile(selectedData.value.id, { name: newFileName.value })
      updateItem(selectedData.value.id, result)
      await refetchfiles()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  async function deleteFile() {
    try {
      if (!selectedData.value) return
      loading.value = true
      await destroyFile(selectedData.value.id)
      deleteItem(selectedData.value.id)
      await refetchfiles()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function openModal(file: FileProps | undefined, modalName: string) {
    if (file) selectedData.value = file
    modal.value = modalName
  }

  watch(search, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fetchfiles(selected.value?.id, {
        name: search.value,
        ...(search.value && { all: true })
      })
    }, 500)
  })

  watch(selected, () => {
    search.value = ''
    fetchfiles(selected.value?.id)
  })

  onUnmounted(() => {
    clearTimeout(timeout)
  })

  return {
    firstRender,
    loading,
    error,
    files,
    modal,
    newFolder,
    newFile,
    actions,
    newFileName,
    selectedData,
    search,
    fetchfiles,
    refetchfiles,
    createFolder,
    uploadFile,
    editFile,
    deleteFile,
    openModal
  }
}
