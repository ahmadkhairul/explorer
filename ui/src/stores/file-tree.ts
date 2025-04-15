import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { FileNode, FileProps } from '@/types'

export const useFileTreeStore = defineStore('fileTree', () => {
  const tree = ref<FileNode[]>([])
  const cache = ref<Record<number, FileNode[]>>({})
  const loading = ref<boolean>(true)
  const error = ref<any>(null)
  const selected = ref<FileNode | null>(null)
  const breadcrumb = ref<FileProps[]>([])

  const initTree = async (all: FileProps[]) => {
    try {
      const map: Record<number, FileNode[]> = {}

      for (const file of all) {
        const parentId = file.parent_id ?? 0
        if (!map[parentId]) map[parentId] = []
        map[parentId].push({ ...file, expanded: true, children: [] })
      }

      const buildTree = (parentId: number): FileNode[] => {
        return (map[parentId] || []).map((node) => ({
          ...node,
          children: buildTree(node.id)
        }))
      }

      tree.value = buildTree(0)
      cache.value = map
      loading.value = false
    } catch (error: any) {
      loading.value = false
      error.value = error
    }
  }

  const expandNode = (node: FileNode) => {
    node.expanded = !node.expanded
  }

  const setselected = (node: FileNode) => {
    selected.value = node;
  }

  return {
    tree,
    cache,
    initTree,
    loading,
    error,
    expandNode,
    selected,
    setselected,
    breadcrumb
  }
})
