<template>
    <div
        class="flex justify-between items-center lg:hidden px-4 py-1 sm:py-2 bg-white dark:bg-darkGray-800 shadow"
    >
        <button
            class="-ml-3 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-darkGray-600 hover:text-gray-900 focus:outline-none focus:ring focus:ring-blue-100 focus:bg-blue-50 group"
            @click="isOpen = true"
        >
            <span class="sr-only">Open sidebar</span>
            <!-- Heroicon name: outline/menu -->
            <svg
                class="h-6 w-6 text-gray-500 dark:text-darkGray-300 group-hover:text-blue-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                />
            </svg>
        </button>

        <div class="flex items-center justify-center">
            <img class="w-8 h-8 sm:w-10 sm:h-10" src="@/assets/img/plasm.png" />
            <Logotype />
        </div>

        <button
            type="button"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-100 focus:outline-none focus:ring focus:ring-blue-100"
        >
            <svg class="h-full w-full" viewBox="0 0 64 64">
                <circle cx="32" cy="32" fill="#eee" r="32"></circle>
                <circle cx="32" cy="8" fill="hsl(230, 93%, 75%)" r="5"></circle>
                <circle cx="32" cy="20" fill="hsl(90, 93%, 75%)" r="5"></circle>
                <circle cx="21.607695154586736" cy="14" fill="hsl(320, 93%, 35%)" r="5"></circle>
                <circle cx="11.215390309173472" cy="20" fill="hsl(230, 93%, 75%)" r="5"></circle>
                <circle cx="21.607695154586736" cy="26" fill="hsl(90, 93%, 75%)" r="5"></circle>
                <circle cx="11.215390309173472" cy="32" fill="hsl(320, 93%, 35%)" r="5"></circle>
                <circle cx="11.215390309173472" cy="44" fill="hsl(230, 93%, 75%)" r="5"></circle>
                <circle cx="21.607695154586736" cy="38" fill="hsl(90, 93%, 75%)" r="5"></circle>
                <circle cx="21.607695154586736" cy="50" fill="hsl(320, 93%, 35%)" r="5"></circle>
                <circle cx="32" cy="56" fill="hsl(230, 93%, 75%)" r="5"></circle>
                <circle cx="32" cy="44" fill="hsl(90, 93%, 75%)" r="5"></circle>
                <circle cx="42.392304845413264" cy="50" fill="hsl(320, 93%, 35%)" r="5"></circle>
                <circle cx="52.78460969082653" cy="44" fill="hsl(230, 93%, 75%)" r="5"></circle>
                <circle cx="42.392304845413264" cy="38" fill="hsl(90, 93%, 75%)" r="5"></circle>
                <circle cx="52.78460969082653" cy="32" fill="hsl(320, 93%, 35%)" r="5"></circle>
                <circle cx="52.78460969082653" cy="20" fill="hsl(230, 93%, 75%)" r="5"></circle>
                <circle cx="42.392304845413264" cy="26" fill="hsl(90, 93%, 75%)" r="5"></circle>
                <circle cx="42.392304845413264" cy="14" fill="hsl(320, 93%, 35%)" r="5"></circle>
                <circle cx="32" cy="32" fill="hsl(151, 93%, 35%)" r="5"></circle>
            </svg>
        </button>
    </div>
</template>

<script lang="ts">
import { useSidebar } from '@/hooks';
import { defineComponent } from 'vue';
import Logotype from './Logotype.vue';

export default defineComponent({
    components: { Logotype },
    setup() {
        const { isOpen } = useSidebar();
        return {
            isOpen,
        };
    },
});
</script>
