<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <p class="text-gray-400">Account: {{ allAccounts ? allAccounts[0] : 'no account selected' }}</p>
    <!-- <p class="text-gray-400">Balance: {{ balance ? balance.toString() : '0' }}</p> -->
    <p class="text-gray-400">Counter: {{ testCounter ? testCounter.toString() : '0' }}</p>

    <p class="text-gray-400">{{ api ? api.isConnected : 'no api' }}</p>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import { useApi, useAccount } from '@/hooks';

export default defineComponent({
    setup() {
        const { api, testCounter } = useApi();
        const { allAccounts } = useAccount();

        watchEffect(() => {
            // fixme: this part returns an empty value when the page changes (i.e., unmounted and remounted)
            // whilst the value from the hook is correctly assigned
            console.log(allAccounts.value);
        });

        return {
            api,
            // balance,
            allAccounts,
            testCounter,
        };
    },
});
</script>
