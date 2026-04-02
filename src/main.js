import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'  // Import router kita

createApp(App)
  .use(router)  // Daftarkan router
  .mount('#app')