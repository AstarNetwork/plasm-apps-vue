<template>
    <div class="flex-1 flex flex-col pt-10 overflow-y-auto">
        <div class="flex items-center justify-center flex-shrink-0">
            <img class="w-10 h-10" src="@/assets/img/plasm.png" />
            <logotype />
        </div>

        <div class="p-4">
            <button
                type="button"
                class="inline-flex justify-center w-full rounded-full border border-gray-300 dark:border-darkGray-600 px-4 py-3 bg-white dark:bg-darkGray-900 text-xs font-medium text-gray-700 dark:text-darkGray-100 hover:bg-gray-100 dark:hover:bg-darkGray-700 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600"
            >
                Plasm Network (Mainnet)
                <!-- Heroicon name: solid/chevron-down -->
                <svg
                    class="-mr-1 ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>

        <nav class="flex-1">
            <router-link
                to="/balance"
                :class="[
                    $route.path.split('/')[1] === 'balance' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- original icon -->
                <svg
                    :class="[
                        $route.path.split('/')[1] === 'balance' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <circle
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        cx="16.04"
                        cy="13.76"
                        r="1.5"
                    />
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        d="M19.21,7.5l.69-.06c0-.53,0-1.32,0-1.63a1.69,1.69,0,0,0-1.69-1.69H5.25A2.26,2.26,0,0,0,3,6.38V17.62a2.26,2.26,0,0,0,2.25,2.26h14A1.74,1.74,0,0,0,21,18.19v-9A1.74,1.74,0,0,0,19.21,7.5Z"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="19.9"
                        y1="7.5"
                        x2="6.63"
                        y2="7.5"
                    />
                </svg>
                <span class="ml-3 flex-1">
                    <p class="font-bold">Balance</p>
                    <!-- TODO : Use current address and balance -->
                    <p
                        class="text-xs text-blue-900 dark:text-darkGray-100 font-semibold flex justify-between"
                    >
                        <span>AddressName</span><span class="ml-2">100PLM</span>
                    </p>
                    <p class="text-xs text-gray-500 dark:text-darkGray-400">5Hn8MM......2dZzwc</p>
                </span>
            </router-link>

            <router-link
                to="/dapps"
                :class="[
                    $route.path.split('/')[1] === 'dapps' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- original icon -->
                <svg
                    :class="[
                        $route.path.split('/')[1] === 'dapps' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        d="M10.1,18.92l-5-5S8,0,21.93,2.07C24,16,10.1,18.92,10.1,18.92Z"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="7"
                        y1="11.26"
                        x2="13.2"
                        y2="17.45"
                    />
                    <circle
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        cx="16"
                        cy="8.07"
                        r="2.5"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="2.58"
                        y1="21.49"
                        x2="5.58"
                        y2="18.49"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="1.71"
                        y1="18.59"
                        x2="3.71"
                        y2="16.59"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="5.57"
                        y1="22.59"
                        x2="7.57"
                        y2="20.59"
                    />
                    <polyline
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        points="8.26 7.26 4.41 7.71 1.53 12.15 5.42 12.81"
                    />
                    <polyline
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        points="16.41 16 16.07 19.59 11.85 22.59 11.17 18.62"
                    />
                </svg>
                <span class="ml-3 flex-1">dApps</span>
            </router-link>

            <router-link
                to="/staking"
                :class="[
                    $route.path.split('/')[1] === 'staking' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- original icon -->
                <svg
                    :class="[
                        $route.path.split('/')[1] === 'staking' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        d="M21.1,5.88l-.66,0A12.6,12.6,0,0,1,12,2.67,12.6,12.6,0,0,1,3.56,5.9l-.66,0a12.83,12.83,0,0,0-.4,3.18A12.68,12.68,0,0,0,12,21.33,12.68,12.68,0,0,0,21.5,9.06,12.83,12.83,0,0,0,21.1,5.88Z"
                    />
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        d="M9.59,16h3.75a1.87,1.87,0,0,0,.44-3.72,1.62,1.62,0,0,0-.44,0H9.59Z"
                    />
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        d="M9.59,12.22h3.75a1.87,1.87,0,0,0,.44-3.72,1.62,1.62,0,0,0-.44,0H9.59Z"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="12.51"
                        y1="7.15"
                        x2="12.51"
                        y2="8.36"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="12.51"
                        y1="16.12"
                        x2="12.51"
                        y2="17.32"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="8.57"
                        y1="8.49"
                        x2="10.14"
                        y2="8.49"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="8.57"
                        y1="15.99"
                        x2="10.14"
                        y2="15.99"
                    />
                </svg>
                <span class="ml-3 flex-1">Staking</span>
            </router-link>

            <router-link
                to="/lockdrop"
                :class="[
                    $route.path.split('/')[1] === 'lockdrop' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- Heroicon name: outline/lock-closed -->
                <svg
                    :class="[
                        $route.path.split('/')[1] === 'lockdrop'
                            ? activeSvgClass
                            : inactiveSvgClass,
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                </svg>
                <span class="ml-3 flex-1">DOT Lockdrop</span>
            </router-link>

            <router-link
                to="/history"
                :class="[
                    $route.path.split('/')[1] === 'history' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- original icon -->
                <svg
                    :class="[
                        $route.path.split('/')[1] === 'history' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <polyline
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        points="12 8 12 12 15 15"
                    />
                    <polyline
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        points="4.14 2.5 4.14 7.5 4.72 7.5"
                    />
                    <line
                        stroke="currentColor"
                        stroke-width="2"
                        x1="4.72"
                        y1="7.5"
                        x2="9.14"
                        y2="7.5"
                    />
                    <path
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        d="M4.21,16.5a9,9,0,1,0,0-9"
                    />
                </svg>
                <span class="ml-3 flex-1">History</span>
            </router-link>
        </nav>
    </div>

    <div class="flex-shrink-0 p-4 border-t border-gray-200 dark:border-darkGray-600">
        <SocialMediaLinks />
        <LightDarkMode />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useSidebar } from '@/hooks/useSidebar';
import Logotype from './Logotype.vue';
import SocialMediaLinks from './SocialMediaLinks.vue';
import LightDarkMode from './LightDarkMode.vue';

export default defineComponent({
    components: { Logotype, SocialMediaLinks, LightDarkMode },
    setup() {
        const { isOpen } = useSidebar();
        const classes = reactive({
            activeLinkClass:
                'bg-blue-200 dark:bg-blue-500 bg-opacity-20 dark:text-white text-blue-500 group flex px-4 py-6 border-r-4 border-blue-500 cursor-default',
            inactiveLinkClass:
                'text-gray-500 dark:text-darkGray-300 hover:text-gray-700 dark:hover:text-white group flex items-center px-4 py-6 text-sm font-medium',
            activeSvgClass: 'text-blue-500 dark:text-white h-6 w-6',
            inactiveSvgClass:
                'text-gray-500 dark:text-darkGray-300 group-hover:text-gray-700 dark:group-hover:text-white h-6 w-6',
        });

        return {
            isOpen,
            ...classes,
        };
    },
});
</script>
