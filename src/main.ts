import './assets/main.scss'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'
import element from './plugins/elementPlus'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(element)

app.mount('#app')
