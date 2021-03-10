<template>
    <nav class="ml-12 -mb-px flex justify-items-center" aria-label="Tabs">
        <router-link
            append
            v-for="num in labelsNumArray"
            :to="{ path: labels[num].path }"
            :key="num"
            v-bind:class="[active === labels[num].path ? activeLinkClass : inactiveLinkClass]"
        >
            <span
                v-bind:class="[active === labels[num].path ? activeSpanClass : inactiveSpanClass]"
            >
                {{ labels[num].label }}
            </span>
        </router-link>
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    props: {
        labels: { type: Array as PropType<Array<{ label: string; path: string }>>, required: true },
    },

    setup(props) {
        const route = useRoute();
        // when `route.path` is `/dapps/dapps-staking`, `active` is `dapps-staking`.
        const active = computed(() => route.path.split('/')[2]);
        const classes = reactive({
            activeLinkClass: 'border-gray-200 dark:border-darkGray-600 border rounded-t-md',
            inactiveLinkClass: 'border-gray-50 dark:border-darkGray-900 border rounded-t-md',
            activeSpanClass:
                'block bg-gray-50 dark:bg-darkGray-900 -mb-px whitespace-nowrap py-3 sm:py-5 px-8 text-blue-900 dark:text-darkGray-300 font-medium rounded-t-md border-gray-50 dark:border-darkGray-900 border-b',
            inactiveSpanClass:
                'block bg-gray-50 dark:bg-darkGray-900 -mb-px whitespace-nowrap py-3 sm:py-5 px-8 text-blue-500 dark:text-blue-400 font-medium rounded-t-md border-gray-200 dark:border-darkGray-600 border-b hover:text-blue-400 dark:hover:text-blue-300',
        });
        const labelsNumArray = computed(() => [...Array(props.labels.length).keys()]);
        return {
            labelsNumArray,
            active,
            ...props,
            ...classes,
        };
    },
});
</script>
