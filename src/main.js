import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = create(App);
const pinia = createPinia();

//createApp(App).mount('#app')

app.use(pinia);
app.mount('#app');