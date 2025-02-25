import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import VueFeather from 'vue-feather';
import { createPinia } from 'pinia'
import router from './router'
import i18n from "./i18n"
import App from './App.vue';
import './assets/main.css'
import './assets/fontawsome/css/fontawesome.css'
import './assets/fontawsome/css/regular.css'
import './assets/fontawsome/css/solid.css'

const app = createApp(App);
const pinia = createPinia();

app.component(VueFeather.name, VueFeather);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
