import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';
import './assets/style/base.css';
import './registerServiceWorker';
import DashboardLayout from './layouts/DashboardLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
import { createMetaManager } from 'vue-meta';

const app = createApp(App);

app.component('default-layout', DashboardLayout);
app.component('empty-layout', EmptyLayout);

app.use(router);
app.use(store);
app.use(createMetaManager());

app.mount('#app');
