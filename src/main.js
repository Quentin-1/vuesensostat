import { createApp } from "vue";
import router from "./router";
import App from './views/App.vue'
import './registerServiceWorker'

createApp(App).use(router).mount('#app')
