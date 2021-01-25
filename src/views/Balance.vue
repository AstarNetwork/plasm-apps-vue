<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <span>{{ accountInfos[accounts[0].toString()].data.free }}</span>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive } from 'vue';
import keyring from '@polkadot/ui-keyring';
import { subscribeAccountInfo } from '../api/query/accountInfo';
import { AccountInfo } from '@/api/models';
// import { store } from '../store';

export default defineComponent({
    setup() {
        // const api = await store.getters.api;
        const accounts = keyring.getPairs();
        const accountInfos = reactive<{ [key: string]: AccountInfo }>({});
        // // TODO: switch accounts
        // // TODO: batch unsub
        const unsub = subscribeAccountInfo(accounts[0].address, accountInfos[accounts[0].address]);
        onUnmounted(() => {
            unsub.then();
        });
    },
});
</script>
