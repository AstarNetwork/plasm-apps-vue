<template>
  <div class="rounded-md bg-blue-100 p-4 border border-blue-300 mb-12">
    <div class="flex">
      <div class="flex-shrink-0">
        <!-- Heroicon name: solid/exclamation-circle -->
        <icon-base class="h-6 w-6 text-blue-400" viewBox="0 0 20 20">
          <icon-solid-exclamation-circle />
        </icon-base>
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-bold text-blue-500">
          Support dApps and Earn PLMs
        </h3>
        <div class="mt-2 text-sm text-blue-700">
          <p>
            PLM holders can stake PLMs on dApps so that both application
            developers and PLM holders receive staking rewards.
            <a href="#" class="text-blue-500 underline hover:text-blue-400"
              >Learn more hear</a
            >.
          </p>
        </div>
      </div>
    </div>
  </div>

  <h2
    class="text-blue-900 dark:text-white text-lg font-bold mb-4 leading-tight"
  >
    Team and Projects Building on Plasm Network
  </h2>

  <div class="mb-4">
    <div class="sm:hidden grid grid-cols-2 gap-2">
      <div class="relative">
        <label for="tabs" class="sr-only">Category</label>
        <select
          class="
            appearance-none
            bg-white
            dark:bg-darkGray-900
            w-full
            border border-gray-300
            dark:border-darkGray-500
            rounded-md
            pl-3
            pr-10
            py-2
            text-left
            cursor-default
            focus:outline-none
            focus:ring focus:ring-blue-100
            dark:focus:ring-darkGray-600
            sm:text-sm
            text-blue-900
            dark:text-darkGray-300
          "
        >
          <option selected>All</option>
          <option>#DeFi</option>
          <option>#Games</option>
          <option>#Oracles</option>
          <option>#Parachains</option>
          <option>#Others</option>
        </select>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <icon-base
            class="h-5 w-5 text-gray-400 dark:text-darkGray-400"
            icon-name="selector"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <icon-solid-selector />
          </icon-base>
        </span>
      </div>
      <div class="relative">
        <label for="tabs" class="sr-only">Status</label>
        <select
          class="
            appearance-none
            bg-white
            dark:bg-darkGray-900
            w-full
            border border-gray-300
            dark:border-darkGray-500
            rounded-md
            pl-3
            pr-10
            py-2
            text-left
            cursor-default
            focus:outline-none
            focus:ring focus:ring-blue-100
            dark:focus:ring-darkGray-600
            sm:text-sm
            text-blue-900
            dark:text-darkGray-300
          "
        >
          <option selected>All</option>
          <option>#Yours</option>
          <option>#Staked</option>
        </select>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <icon-base
            class="h-5 w-5 text-gray-400 dark:text-darkGray-400"
            icon-name="selector"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <icon-solid-selector />
          </icon-base>
        </span>
      </div>
    </div>
    <div class="hidden sm:flex items-center">
      <nav class="flex space-x-1">
        <!-- on -->
        <a
          href="#"
          class="
            bg-blue-100
            dark:bg-blue-200
            text-blue-700
            px-3
            py-1
            font-bold
            text-sm
            rounded-full
          "
        >
          All
        </a>
        <!-- off -->
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #DeFi
        </a>
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #Games
        </a>
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #Oracles
        </a>
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #Parachains
        </a>
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #Others
        </a>
      </nav>
      <span class="border-l border-gray-200 h-4 mx-3"></span>
      <nav class="flex space-x-1">
        <!-- on -->
        <a
          href="#"
          class="
            bg-blue-100
            dark:bg-blue-200
            text-blue-700
            px-3
            py-1
            font-bold
            text-sm
            rounded-full
          "
        >
          All
        </a>
        <!-- off -->
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #Yours
        </a>
        <a
          href="#"
          class="
            text-gray-500
            dark:text-darkGray-400
            hover:text-gray-700
            dark:hover:text-darkGray-300
            px-3
            py-1
            text-sm
            rounded-full
          "
        >
          #Staked
        </a>
      </nav>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4">
    <DappsItem name="Polkadot.js" icon="logo-polkadot-js.png" />
    <DappsItem name="Subscan" icon="logo-subscan.png" />
    <DappsItem name="MetaMask" icon="logo-metamask.png" />
    <DappsItem name="Chainlink" icon="logo-chainlink.png" />
    <DappsItem name="Polkadot.js" icon="logo-polkadot-js.png" />
    <DappsItem name="Subscan" icon="logo-subscan.png" />
    <DappsItem name="MetaMask" icon="logo-metamask.png" />
    <DappsItem name="Chainlink" icon="logo-chainlink.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApi } from '@/hooks/useApi';
import IconBase from '@/components/icons/IconBase.vue';
import IconSolidExclamationCircle from '@/components/icons/IconSolidExclamationCircle.vue';
import IconSolidSelector from '@/components/icons/IconSolidSelector.vue';
import DappsItem from '@/components/dapps/DappsItem.vue';

export default defineComponent({
  components: {
    IconBase,
    IconSolidExclamationCircle,
    IconSolidSelector,
    DappsItem,
  },
  setup() {
    const { api } = useApi();

    return {
      api,
    };
  },
});
</script>
