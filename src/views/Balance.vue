<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <span class="text-gray-400">{{ balance.toString() }}</span>
</template>

<script lang="ts">
import BN from 'bn.js';
import { defineComponent, onUnmounted, ref, watch } from 'vue';
import keyring from '@polkadot/ui-keyring';
import { subscribeBalance } from '@/api/query/accountInfo';
import { Balance } from '@/api/models';
import { store } from '@/store';
import { VoidFn } from '@polkadot/api/types';

export default defineComponent({
    setup() {
        console.log('created');
        const balance = ref<Balance>(new BN(0));
        // TODO: move keyring to store;
        let accounts;
        // TODO: map multiple unsubs;
        let unsub: VoidFn;
        onUnmounted(() => {
            if (unsub) {
                unsub();
            }
        });
        watch(
            () => store.state.initialized,
            async () => {
                if (store.getters.initialized) {
                    accounts = keyring.getPairs();
                    // TODO: switch accounts
                    const account = accounts[0];
                    unsub = await subscribeBalance(account.address, balance);
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
