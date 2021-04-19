<template>
  <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
  <p class="text-gray-400">
    Account: {{ allAccounts ? allAccounts[0] : 'no account selected' }}
  </p>
  <p class="text-gray-400">
    Balance: {{ balance ? balance.toString(10) : 'cannot read' }}
  </p>
  <p class="text-gray-400">
    Counter: {{ testCounter ? testCounter.toString() : '0' }}
  </p>
  <p class="text-gray-400">{{ api ? api.isConnected : 'no api' }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useApi, useAccount, useBalance } from '@/hooks';

export default defineComponent({
  setup() {
    const { api, testCounter } = useApi();
    const { allAccounts } = useAccount();
    const addr = 'Wh2nf6F5ZNJguoQu22Z361xo6VFqX1Y2BuQMcJBSJxERh5E';
    const { balance } = useBalance(ref(addr));

    return {
      api,
      balance,
      allAccounts,
      testCounter,
    };
  },
});
</script>
