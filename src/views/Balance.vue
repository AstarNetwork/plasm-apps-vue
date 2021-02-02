<template>
    <h2 class="text-gray-400 text-3xl font-medium">Balance</h2>
    <span class="text-gray-400">{{ balance ? balance.toString() : '0' }}</span>
    <p class="text-gray-400">{{ api ? api.isConnected : 'no api' }}</p>
</template>

<script lang="ts">
import BN from 'bn.js';
import { defineComponent, ref } from 'vue';
import { Balance } from '@/api/models';
import { useApi } from '@/hooks/useApi';

export default defineComponent({
    setup() {
        const balance = ref<Balance>(new BN(0));
        const { api } = useApi();

        return {
            api,
            balance,
        };
    },
});
</script>
