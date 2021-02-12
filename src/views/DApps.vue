<template>
    <h2 class="text-gray-400 text-3xl font-medium">dApps</h2>
    <p class="text-gray-400">Counter: {{ testCounter ? testCounter.toString() : '0' }}</p>
    <button class="text-gray-400" @click="setCounter(testCounter + 1)">Increment</button>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useApi } from '@/hooks/useApi';

export default defineComponent({
    setup() {
        const { api, testCounter, setCounter } = useApi();

        watch(
            () => testCounter,
            (testCounter) => {
                console.log('testCounter triggered');
                console.log(testCounter);
            },
        );

        return {
            api,
            testCounter,
            setCounter,
        };
    },
});
</script>
