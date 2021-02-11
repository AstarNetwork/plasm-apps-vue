<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <p class="text-gray-400">
        Account: {{ currentAccount ? currentAccount.address : 'no account selected' }}
    </p>
    <p class="text-gray-400">Balance: {{ balance ? balance.toString() : '0' }}</p>
    <p class="text-gray-400">Counter: {{ testCounter ? testCounter.toString() : '0' }}</p>

    <p class="text-gray-400">{{ api ? api.isConnected : 'no api' }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApi, useAccount } from '@/hooks';

export default defineComponent({
    setup() {
        const { api, testCounter } = useApi();
        const { currentAccount, currentBalance, setCurrentAccount } = useAccount();
        const balance = currentBalance;

        setCurrentAccount(0);

        return {
            api,
            balance,
            currentAccount,
            testCounter,
        };
    },
});
</script>
