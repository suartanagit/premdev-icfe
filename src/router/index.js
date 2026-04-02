import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

// Definisi Routes: Mapping URL ke Component
const routes = [
  {
    path: '/',              // URL: <http://localhost:5173/>
    component: HomeView,    // Komponen yang akan ditampilkan
  },
  {
    path: '/product/:id',   // URL dinamis, contoh: /product/1
    component: ProductDetailView,
    props: true,            // Kirim route params sebagai props
  },
  {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
]

// Buat instance router
export const router = createRouter({
  history: createWebHistory(),  // Mode history (URL tanpa #)
  routes,                       // Daftar routes kita
})