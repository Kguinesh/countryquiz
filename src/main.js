import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/tailwind.css'

//const app = create(App);
const pinia = createPinia();

createApp(App).mount('#app');
createApp(App).use(pinia);

//app.use(pinia);
//app.mount('#app');