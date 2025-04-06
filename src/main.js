import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import 'primeicons/primeicons.css'
import router from '@/router'; //importante: non specifichiamo il file in cui c'è la variabile router perché il file index.js è automaticamente "visibile"
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
const app = createApp(App);
app.use(router);
app.use(Toast)
app.mount('#app')
