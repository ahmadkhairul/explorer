<script setup lang="ts">
import type { FileNode } from '@/types'

const emit = defineEmits(['toggle', 'setselected'])
const { file, selected } = defineProps<{ file: FileNode; selected: FileNode | null }>()
</script>

<template>
  <div class="h-full">
    <div class="folder" :class="{ selected: selected?.id === file.id }">
      <span @click="$emit('toggle', file)">
        {{ file.expanded ? '🔽' : '▶️' }}
      </span>
      <span class="w-full" @click="$emit('setselected', file)"> 📁 {{ file.name }} </span>
    </div>

    <transition name="fade">
      <div class="child-items" v-if="file.expanded">
        <FileTreeItem
          v-for="child in file.children"
          :key="child.id"
          :file="child"
          :selected="selected"
          @toggle="$emit('toggle', $event)"
          @setselected="$emit('setselected', $event)"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.folder {
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition:
    background 0.3s,
    transform 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.folder:hover,
.selected {
  background-color: #cce5ff;
  color: #004085;
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
