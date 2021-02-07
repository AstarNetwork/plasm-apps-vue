<template>
    <Suspense>
        <template #default>
            <polkadot-provider>
                <component :is="layout">
                    <router-view />
                </component>
            </polkadot-provider>
        </template>
        <template #fallback>
            <spinner />
        </template>
    </Suspense>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import polkadotProvider from '@/hooks/providers/PolkadotProvider.vue';
import Spinner from '@/components/Spinner.vue';

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
        Spinner,
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
