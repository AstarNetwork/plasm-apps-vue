import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Balance from '@/views/Balance.vue';
import DApps from '@/views/DApps.vue';
import Staking from '@/views/Staking.vue';
import History from '@/views/History.vue';
import Lockdrop from '@/views/Lockdrop.vue';
import DappStoreTab from '@/components/dapps/DappStoreTab.vue';
import CreateDappsTab from '@/components/dapps/CreateDappsTab.vue';
import BalancePlasm from '@/components/balance/BalancePlasm.vue';
import CrossChain from '@/components/balance/CrossChain.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/balance',
  },
  {
    path: '/balance',
    name: 'Balance',
    component: Balance,
    children: [
      {
        path: '',
        redirect: '/balance/balance-plasm',
      },
      {
        path: 'balance-plasm',
        component: BalancePlasm,
      },
      {
        path: 'cross-chain',
        component: CrossChain,
      },
    ],
  },
  {
    path: '/dapps',
    name: 'dApps',
    component: DApps,
    children: [
      {
        path: '',
        redirect: '/dapps/create-dapps',
      },
      {
        path: 'dapp-store',
        component: DappStoreTab,
      },
      {
        path: 'create-dapps',
        component: CreateDappsTab,
      },
    ],
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
