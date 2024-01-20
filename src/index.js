import './assets/style.css';
import { createApp } from 'vue';
import 'vue-toastification/dist/index.css';
import Toast from 'vue-toastification';
import App from './App.vue';

createApp(App).use(Toast).mount('#root');
