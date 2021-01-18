import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Balance from '../views/Balance.vue';
import DApps from '../views/DApps.vue';
import Staking from '../views/Staking.vue';
import History from '../views/History.vue';
import Lockdrop from '../views/Lockdrop.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/balance',
    },
    {
        path: '/balance',
        name: 'Balance',
        component: Balance,
    },
    {
        path: '/dapps',
        name: 'dApps',
        component: DApps,
    },
    {
        path: '/staking',
        name: 'Staking',
        component: Staking,
    },
    {
        path: '/history',
        name: 'History',
        component: History,
    },
    {
        path: '/lockdrop',
        name: 'Lockdrop',
        component: Lockdrop,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
});

export default router;
