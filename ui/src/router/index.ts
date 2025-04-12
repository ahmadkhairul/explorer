import { createRouter, createWebHistory } from 'vue-router'
import FileExplorer from '@/pages/file-explorer.vue'
import Login from '@/pages/login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/file-explorer',
      name: 'File Explorer',
      component: FileExplorer
    }
  ]
})

export default router
