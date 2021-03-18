<template>
    <div class="flex">
        <!-- Backdrop -->
        <div
            :class="isOpen ? 'block' : 'hidden'"
            @click="isOpen = false"
            class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
        ></div>
        <!-- End Backdrop -->

        <div
            :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
            class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
        >
            <div class="flex items-center justify-center mt-8 ml-8">
                <div class="flex items-center">
                    <img class="h-12 w-12" src="@/assets/img/plasm.png" alt="logo" />

                    <span class="text-white text-2xl mx-2 font-semibold">Plasm Network</span>
                </div>
            </div>

            <nav class="mt-10">
                <router-link
                    class="flex items-center mt-4 py-2 px-6 border-l-4"
                    :class="[$route.path.split('/')[1] === 'balance' ? activeClass : inactiveClass]"
                    to="/balance"
                >
                    <span class="h-5 w-5">Balance</span>
                </router-link>

                <router-link
                    class="flex items-center mt-4 py-2 px-6 border-l-4"
                    :class="[$route.path.split('/')[1] === 'dapps' ? activeClass : inactiveClass]"
                    to="/dapps"
                >
                    <span class="h-5 w-5">dApps</span>
                </router-link>

                <router-link
                    class="flex items-center mt-4 py-2 px-6 border-l-4"
                    :class="[$route.path.split('/')[1] === 'staking' ? activeClass : inactiveClass]"
                    to="/staking"
                >
                    <span class="h-5 w-5">Staking</span>
                </router-link>

                <router-link
                    class="flex items-center mt-4 py-2 px-6 border-l-4"
                    :class="[$route.path.split('/')[1] === 'history' ? activeClass : inactiveClass]"
                    to="/history"
                >
                    <span class="h-5 w-5">History</span>
                </router-link>

                <router-link
                    class="flex items-center mt-4 py-2 px-6 border-l-4"
                    :class="[
                        $route.path.split('/')[1] === 'lockdrop' ? activeClass : inactiveClass,
                    ]"
                    to="/lockdrop"
                >
                    <span class="h-5 w-5">Lockdrop</span>
                </router-link>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSidebar } from '@/hooks/useSidebar';

export default defineComponent({
    setup() {
        const { isOpen } = useSidebar();
        const activeClass = ref('bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100');
        const inactiveClass = ref(
            'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
        );

        return {
            isOpen,
            activeClass,
            inactiveClass,
        };
    },
});
</script>
