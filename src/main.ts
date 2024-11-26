import './assets/main.css'
import './assets/boxicons-2.1.4/css/boxicons.css'
import './assets/js/color-modes.js'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
