<template>
    <h2 class="text-gray-400 text-3xl font-medium">dApps</h2>
    <p class="text-gray-400">Counter: {{ counter ? counter.toString() : '0' }}</p>
    <button class="text-gray-400" @click="setCounter(counter + 1)">Increment</button>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import { useApi } from '@/hooks/useApi';

export default defineComponent({
    setup() {
        const { api, testCounter, setCounter } = useApi();

        const counter = ref(testCounter);

        watchEffect(() => {
            console.log('testCounter triggered');
            console.log(counter.value);
        });

        return {
            api,
            counter,
            setCounter,
        };
    },
});
</script>
