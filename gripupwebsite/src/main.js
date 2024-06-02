import '../src/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue'
import router from './router'


const app = createApp(App)

const pinia = createPinia()
export default pinia;
app.use(pinia)
app.use(router);
app.mount('#app')
