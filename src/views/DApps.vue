<template>
    <div class="flex flex-col flex-1 overflow-y-auto lg:overflow-hidden">
        <!-- <%- include('./components/common/_header-mobile'); -%> -->

        <main class="flex-1 relative z-0 lg:overflow-y-auto overflow-x-hidden focus:outline-none">
            <div class="px-4 sm:px-8 py-10 lg:py-16">
                <div
                    class="sm:flex items-end border-b border-gray-300 dark:border-darkGray-600 mb-8 -mx-4 sm:-mx-8 px-4 sm:px-8"
                >
                    <h1 class="text-3xl font-extrabold text-blue-900 dark:text-white mb-6 sm:mb-8">
                        dApps
                    </h1>
                    <Tab
                        :labels="[
                            { label: 'dApps Staking', path: 'dapps-staking' },
                            { label: 'Create dApps', path: 'create-dapps' },
                        ]"
                    />
                    <!-- <%- include('./components/common/_address-change'); -%> -->
                </div>
                <router-view />
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import { useApi } from '@/hooks/useApi';
import Tab from '@/components/common/Tab.vue';

export default defineComponent({
    components: {
        Tab,
    },
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
