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
            <icon-base
                class="h-6 w-6 text-gray-500 dark:text-darkGray-300 group-hover:text-blue-900"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <icon-outline-menu />
            </icon-base>
        </button>

        <div class="flex items-center justify-center">
            <img class="w-8 h-8 sm:w-10 sm:h-10" src="@/assets/img/plasm.png" />
            <Logotype />
        </div>

        <button
            type="button"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-100 focus:outline-none focus:ring focus:ring-blue-100"
        >
            <icon-base class="h-full w-full" viewBox="0 0 64 64">
                <icon-account-sample />
            </icon-base>
        </button>
    </div>
</template>

<script lang="ts">
import { useSidebar } from '@/hooks';
import { defineComponent } from 'vue';
import IconBase from '../icons/IconBase.vue';
import IconOutlineMenu from '../icons/IconOutlineMenu.vue';
import IconAccountSample from '../icons/IconAccountSample.vue';

import Logotype from './Logotype.vue';

export default defineComponent({
    components: { Logotype, IconBase, IconOutlineMenu, IconAccountSample },
    setup() {
        const { isOpen } = useSidebar();
        return {
            isOpen,
        };
    },
});
</script>
