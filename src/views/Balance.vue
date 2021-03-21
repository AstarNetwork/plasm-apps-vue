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
        <!-- <AddressChange /> -->
      </div>

      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useApi, useAccount, useBalance } from '@/hooks';
import Tab from '@/components/common/Tab.vue';
// import AddressChange from '@/components/common/AddressChange.vue';

export default defineComponent({
  components: {
    Tab,
    // AddressChange
  },
  setup() {
    // const { api, testCounter } = useApi();
    // const { allAccounts } = useAccount();
    // const addr = 'Wh2nf6F5ZNJguoQu22Z361xo6VFqX1Y2BuQMcJBSJxERh5E';
    // const { balance } = useBalance(addr);
  },
});
</script>
