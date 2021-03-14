<template>
    <!-- TODO: Switch Light & Dark mode -->
    <div class="flex items-center">
        <button
            type="button"
            class="tooltip p-3 rounded-full relative focus:outline-none cursor-default"
        >
            <!-- Heroicon name: outline/sun -->
            <svg
                class="text-blue-900 dark:text-darkGray-100 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>
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
            <svg
                class="text-gray-300 dark:text-darkGray-500 h-5 w-5 group-hover:text-blue-900 dark:group-hover:text-darkGray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
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

export default defineComponent({
    setup() {},
});
</script>
