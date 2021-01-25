import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';
import './assets/style/base.css';
import './registerServiceWorker';
import DashboardLayout from './layouts/DashboardLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
import { ActionTypes } from './store/action-types';

//TODO: Find better way.
store.dispatch(ActionTypes.GET_NETWORK_API).then((api) => {
    const app = createApp(App);

    app.component('default-layout', DashboardLayout);
    app.component('empty-layout', EmptyLayout);

    app.use(router);
    app.use(store);

    app.mount('#app');
});
