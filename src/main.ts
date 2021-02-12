import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';
import hooks from './hooks/index';
import './assets/style/base.css';
import './registerServiceWorker';
import DashboardLayout from './layouts/DashboardLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

app.use(router);
app.use(store);
// app.use(hooks);

app.mount('#app');
