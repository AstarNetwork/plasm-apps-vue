<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <span class="text-gray-400">{{ balance ? balance.toString() : '0' }}</span>
</template>

<script lang="ts">
import BN from 'bn.js';
import { defineComponent, ref, watch } from 'vue';
import keyring from '@polkadot/ui-keyring';
import { subscribeBalance } from '@/api/query/accountInfo';
import { Balance } from '@/api/models';
import { store } from '@/store';

export default defineComponent({
    setup() {
        const balance = ref<Balance>(new BN(0));
        // TODO: move keyring to store;
        let accounts;
        // TODO: map multiple unsubs;
        watch(
            () => store.state.initialized,
            () => {
                if (store.getters.initialized) {
                    accounts = keyring.getPairs();
                    // TODO: switch accounts
                    const account = accounts[0];
                    subscribeBalance(account.address, balance);
                }
            },
            { immediate: true },
        );
        return {
            balance,
        };
    },
});
</script>
