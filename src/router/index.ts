import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Balance from '@/views/Balance.vue';
import DApps from '@/views/DApps.vue';
import Staking from '@/views/Staking.vue';
import History from '@/views/History.vue';
import Lockdrop from '@/views/Lockdrop.vue';
import DappsStaking from '@/components/dapps/DappsStaking.vue';
import CreateDapps from '@/components/dapps/CreateDapps.vue';
import BalancePlasm from '@/components/balance/BalancePlasm.vue';
import CrossChain from '@/components/balance/CrossChain.vue';
import AccountAction from '@/components/staking/AccountAction.vue';

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
        redirect: '/dapps/dapps-staking',
      },
      {
        path: 'dapps-staking',
        component: DappsStaking,
      },
      {
        path: 'create-dapps',
        component: CreateDapps,
      },
    ],
  },
  {
    path: '/staking',
    name: 'Staking',
    component: Staking,
    children: [
      {
        path: '',
        redirect: '/staking/account-action',
      },
      {
        path: 'account-action',
        component: AccountAction,
      },
    ],
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
