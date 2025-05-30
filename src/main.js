import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import httpService from './utils/appAxios'
import store from './store'
import GeneralModal from './modals/GeneralModal.vue'

const app = createApp(App)

// Axios servisini global olarak tanımla
app.config.globalProperties.$appAxios = httpService
app.component('GeneralModal', GeneralModal);

app.use(router)
app.use(store)
app.mount('#app')
