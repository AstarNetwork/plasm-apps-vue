<template>
    <polkadot-provider>
        <component :is="layout">
            <router-view />
        </component>
    </polkadot-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import polkadotProvider from '@/components/PolkadotProvider.vue';

const defaultLayout = 'default';

export default defineComponent({
    name: 'App',
    setup() {
        const { currentRoute } = useRouter();

        const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`);

        return {
            layout,
        };
    },
    components: {
        polkadotProvider,
    },
});
</script>

<style>
::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-track {
    background: #cbd5e0;
}

::-webkit-scrollbar-thumb {
    background: #718096;
}

::-webkit-scrollbar-thumb:hover {
    background: #2d3748;
}

.bg-black-alt {
    background: #191919;
}
.text-black-alt {
    color: #191919;
}
.border-black-alt {
    border-color: #191919;
}
</style>
