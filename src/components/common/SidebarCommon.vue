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
                <icon-base class="-mr-1 ml-2 h-4 w-4" viewBox="0 0 20 20" aria-hidden="true">
                    <icon-solid-chevron-down />
                </icon-base>
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
                <icon-base
                    :class="[
                        $route.path.split('/')[1] === 'balance' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    viewBox="0 0 24 24"
                >
                    <icon-balance />
                </icon-base>
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
                <icon-base
                    :class="[
                        $route.path.split('/')[1] === 'dapps' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    viewBox="0 0 24 24"
                >
                    <icon-dapps />
                </icon-base>
                <span class="ml-3 flex-1">dApps</span>
            </router-link>

            <router-link
                to="/staking"
                :class="[
                    $route.path.split('/')[1] === 'staking' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- original icon -->
                <icon-base
                    :class="[
                        $route.path.split('/')[1] === 'staking' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    viewBox="0 0 24 24"
                >
                    <icon-staking />
                </icon-base>
                <span class="ml-3 flex-1">Staking</span>
            </router-link>

            <router-link
                to="/lockdrop"
                :class="[
                    $route.path.split('/')[1] === 'lockdrop' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- Heroicon name: outline/lock-closed -->
                <icon-base
                    :class="[
                        $route.path.split('/')[1] === 'lockdrop'
                            ? activeSvgClass
                            : inactiveSvgClass,
                    ]"
                    iconColor="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <icon-dot-lockdrop />
                </icon-base>
                <span class="ml-3 flex-1">DOT Lockdrop</span>
            </router-link>

            <router-link
                to="/history"
                :class="[
                    $route.path.split('/')[1] === 'history' ? activeLinkClass : inactiveLinkClass,
                ]"
            >
                <!-- original icon -->
                <icon-base
                    :class="[
                        $route.path.split('/')[1] === 'history' ? activeSvgClass : inactiveSvgClass,
                    ]"
                    viewBox="0 0 24 24"
                >
                    <icon-history />
                </icon-base>
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
import IconBase from '../icons/IconBase.vue';
import IconStaking from '../icons/IconStaking.vue';
import IconDapps from '../icons/IconDapps.vue';
import IconDotLockdrop from '../icons/IconDotLockdrop.vue';
import IconBalance from '../icons/IconBalance.vue';
import IconHistory from '../icons/IconHistory.vue';
import IconSolidChevronDown from '../icons/IconSolidChevronDown.vue';

export default defineComponent({
    components: {
        Logotype,
        SocialMediaLinks,
        LightDarkMode,
        IconBase,
        IconDapps,
        IconDotLockdrop,
        IconStaking,
        IconBalance,
        IconHistory,
        IconSolidChevronDown,
    },
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
