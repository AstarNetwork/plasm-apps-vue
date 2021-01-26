<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';
import { store } from './store';
import { ActionTypes } from './store/action-types';

const defaultLayout = 'default';

export default defineComponent({
    name: 'App',
    setup() {
        const { currentRoute } = useRouter();

        store.dispatch(ActionTypes.GET_NETWORK_API);

        const layout = computed(() => `${currentRoute.value.meta.layout || defaultLayout}-layout`);

        return {
            layout,
        };
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
