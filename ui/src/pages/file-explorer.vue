<script setup lang="ts">
import type { Ref } from 'vue'
import FileExplorer from '@/components/file-explorer.vue'
import FileTree from '@/components/file-tree.vue'
import { ref } from 'vue'

const show: Ref<boolean> = ref(true)

const toggle = () => {
  show.value = !show.value
}
</script>

<template>
  <div class="flex w-screen h-screen">
    <aside class="w-96 flex h-screen flex-col" :class="{ 'file-tree': true, hidden: !show }">
      <div class="p-3 border-r-[1px] border-b-[1px] border-blue-400 h-12">File Explorer</div>
      <div class="p-3 border-r-[1px] border-blue-400 flex-1">
        <FileTree />
      </div>
    </aside>

    <main class="flex-1" :class="{ 'file-list': true }">
      <FileExplorer :show @toggle="toggle" />
    </main>
  </div>
</template>

<style scoped></style>
