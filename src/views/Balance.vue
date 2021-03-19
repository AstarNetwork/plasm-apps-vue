<template>
  <main class="flex-1 relative z-0 lg:overflow-y-auto overflow-x-hidden focus:outline-none">
    <div class="px-4 sm:px-8 py-10 lg:py-16">

      <div
        class="sm:flex items-end border-b border-gray-300 dark:border-darkGray-600 mb-8 -mx-4 sm:-mx-8 px-4 sm:px-8">
        <h1 class="text-3xl font-extrabold text-blue-900 dark:text-white mb-6 sm:mb-8">Balance</h1>
        <Tab
          :labels="[
            { label: 'Plasm', path: 'balance-plasm' },
            { label: 'Cross-chain', path: 'cross-chain' },
          ]"
        />
        <AddressChange />
      </div>

      <div class="grid lg:grid-cols-2 gap-4 mb-4">
        <Address />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <TotalBalance />
        <PlmBalance />
      </div>

      <h2 class="text-blue-900 dark:text-white text-lg font-bold my-3">Tokens</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Token />
        <Token />
        <Token />
      </div>
    </div>

    <!-- Modals -->
    <!-- <ModalNetwork /> -->
    <!-- <ModalAccount /> -->
    <!-- <ModalTransferAmount /> -->
    <!-- <ModalTransferToken /> -->
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApi, useAccount, useBalance } from '@/hooks';
import Tab from '@/components/common/Tab.vue';
import AddressChange from '@/components/common/AddressChange.vue';
import Address from '@/components/balance/Address.vue'; 
import PlmBalance from '@/components/balance/PlmBalance.vue';
import Token from '@/components/balance/Token.vue'; 
import TotalBalance from '@/components/balance/TotalBalance.vue';
import ModalNetwork from '@/components/balance/ModalNetwork.vue';
import ModalAccount from '@/components/balance/ModalAccount.vue';
import ModalTransferAmount from '@/components/balance/ModalTransferAmount.vue';
import ModalTransferToken from '@/components/balance/ModalTransferToken.vue';

export default defineComponent({
  components: {
    Tab,
    AddressChange,
    Address,
    PlmBalance,
    Token,
    TotalBalance,
    ModalNetwork,
    ModalAccount,
    ModalTransferAmount,
    ModalTransferToken
  },
  setup() {
    const { api, testCounter } = useApi();
    const { allAccounts } = useAccount();
    const addr = 'Wh2nf6F5ZNJguoQu22Z361xo6VFqX1Y2BuQMcJBSJxERh5E';
    const { balance } = useBalance(addr);

    return {
      api,
      balance,
      allAccounts,
      testCounter,
    };
  },
});
</script>
