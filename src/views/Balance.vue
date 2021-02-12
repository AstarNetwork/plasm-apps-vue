<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <p class="text-gray-400">
        Account: {{ currentAccount ? currentAccount.address : 'no account selected' }}
    </p>
    <!-- <p class="text-gray-400">Balance: {{ balance ? balance.toString() : '0' }}</p> -->
    <p class="text-gray-400">Counter: {{ testCounter ? testCounter.toString() : '0' }}</p>

    <p class="text-gray-400">{{ api ? api.isConnected : 'no api' }}</p>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useApi, useAccount } from '@/hooks';
// import { useBalance } from '@/hooks';

export default defineComponent({
    setup() {
        const { api, testCounter } = useApi();
        const { currentAccount, setCurrentAccount } = useAccount();
        // let { balance, setBalanceAccount } = useBalance(
        //     api,
        //     '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        // );

        setCurrentAccount(0);
        console.log('currentAccount: ' + currentAccount?.address);

        watch(
            () => currentAccount,
            (currentAccount) => {
                console.log('Balance.vue watch triggered');
                if (currentAccount?.address) {
                    console.log('currentAccount: ' + currentAccount.address);
                    // setBalanceAccount(currentAccount.address);
                }
            },
        );

        return {
            api,
            // balance,
            currentAccount,
            testCounter,
        };
    },
});
</script>
