import { createApp } from 'vue'
import pinia from '@/stores/index.js'
import router from './router'

import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(pinia)


app.mount('#app')
