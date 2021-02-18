<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <p class="text-gray-400">Account: {{ allAccounts ? allAccounts[0] : 'no account selected' }}</p>
    <p class="text-gray-400">Balance: {{ balance ? balance : 'cannot read' }}</p>
    <p class="text-gray-400">Counter: {{ testCounter ? testCounter.toString() : '0' }}</p>

    <p class="text-gray-400">{{ api ? api.isConnected : 'no api' }}</p>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from 'vue';
import { useApi, useAccount } from '@/hooks';

export default defineComponent({
    setup() {
        const { api, testCounter } = useApi();
        const { allAccounts } = useAccount();
        const addr = 'Wh2nf6F5ZNJguoQu22Z361xo6VFqX1Y2BuQMcJBSJxERh5E';

        const balance = ref('0');
        const balanceAccount = ref(addr);

        const unsub = ref(
            api!.value.query.system.account(balanceAccount.value, (result) => {
                balance.value = result.data.free.toString();
            }),
        );

        onUnmounted(() => {
            console.log('unsubbing');
            unsub.value.then();
        });

        return {
            api,
            balance,
            allAccounts,
            testCounter,
        };
    },
});
</script>
