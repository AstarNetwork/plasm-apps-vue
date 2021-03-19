<template>
    <!-- TODO: Switch Light & Dark mode -->
    <div class="flex items-center">
        <button
            type="button"
            class="tooltip p-3 rounded-full relative focus:outline-none cursor-default"
        >
            <!-- Heroicon name: outline/sun -->
            <icon-base
                class="text-blue-900 dark:text-darkGray-100 h-5 w-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                iconColor="none"
            >
                <icon-outline-sun />
            </icon-base>
            <!-- Tooltip -->
            <span
                class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90 whitespace-nowrap"
            >
                Light mode
            </span>
        </button>

        <span class="text-gray-300 dark:text-darkGray-500">/</span>

        <button
            type="button"
            class="tooltip p-3 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative group"
        >
            <!-- Heroicon name: outline/moon -->
            <icon-base
                class="text-gray-300 dark:text-darkGray-500 h-5 w-5 group-hover:text-blue-900 dark:group-hover:text-darkGray-300"
                viewBox="0 0 24 24"
                stroke="currentColor"
                iconColor="none"
            >
                <icon-outline-moon />
            </icon-base>
            <!-- Tooltip -->
            <span
                class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90 whitespace-nowrap"
            >
                Dark mode
            </span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '../icons/IconBase.vue';
import IconOutlineSun from '../icons/IconOutlineSun.vue';
import IconOutlineMoon from '../icons/IconOutlineMoon.vue';

export default defineComponent({
    components: { IconBase, IconOutlineSun, IconOutlineMoon },
    setup() {},
});
</script>
