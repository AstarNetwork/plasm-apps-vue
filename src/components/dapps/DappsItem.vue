<template>
  <div
    class="bg-white dark:bg-darkGray-800 overflow-hidden shadow rounded-lg p-5"
  >
    <div class="w-44 h-16 flex items-center mx-auto my-3">
      <img
        :src="iconHref"
        class="w-full h-full object-scale-down"
        :alt="name"
      />
    </div>

    <p
      class="text-blue-900 dark:text-darkGray-100 text-lg font-bold leading-tight mb-1"
    >
      {{ name }}
    </p>

    <p class="text-xs text-gray-500 dark:text-darkGray-400 mb-0.5">
      Web Apps & Browser Extension
    </p>

    <div class="mb-4 text-xs">
      <a
        href="#"
        class="text-blue-500 dark:text-blue-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2"
      >
        #DeFi
      </a>
      <a
        href="#"
        class="text-blue-500 dark:text-blue-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2"
      >
        #Games
      </a>
    </div>

    <div class="inline-flex rounded-full w-full mb-2">
      <button
        type="button"
        class="px-4 py-2 rounded-l-full border border-gray-300 dark:border-darkGray-500 bg-white dark:bg-darkGray-800 text-xs font-medium text-gray-500 dark:text-darkGray-400 hover:bg-gray-50 dark:hover:bg-darkGray-600 hover:text-gray-600 dark:hover:text-darkGray-300 focus:z-10 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 flex-1"
      >
        Stake
      </button>
      <button
        type="button"
        class="-ml-px px-4 py-2 border border-gray-300 dark:border-darkGray-500 bg-white dark:bg-darkGray-800 text-xs font-medium text-gray-500 dark:text-darkGray-400 hover:bg-gray-50 dark:hover:bg-darkGray-600 hover:text-gray-600 dark:hover:text-darkGray-300 focus:z-10 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 flex-1"
      >
        Change
      </button>
      <button
        type="button"
        class="-ml-px px-4 py-2 rounded-r-full border border-gray-300 dark:border-darkGray-500 bg-white dark:bg-darkGray-800 text-xs font-medium text-gray-500 dark:text-darkGray-400 hover:bg-gray-50 dark:hover:bg-darkGray-600 hover:text-gray-600 dark:hover:text-darkGray-300 focus:z-10 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 flex-1"
      >
        Claim
      </button>
    </div>

    <div class="text-center">
      <button
        class="p-2 rounded-full hover:bg-red-400 hover:border-red-400 group focus:outline-none focus:ring focus:ring-red-200 dark:focus:ring-red-400 inline-flex"
      >
        <icon-base
          class="w-4 h-4 text-gray-300 dark:text-darkGray-400 group-hover:text-white dark:group-hover:text-darkGray-900"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <icon-thumbs-up />
        </icon-base>
        <span
          class="text-xs text-gray-500 dark:text-darkGray-400 group-hover:text-white dark:group-hover:text-darkGray-900"
          >100</span
        >
      </button>
      <button
        class="p-2 rounded-full hover:bg-gray-600 dark:hover:bg-darkGray-500 hover:border-gray-600 group focus:outline-none focus:ring focus:ring-gray-200 dark:focus:ring-darkGray-500 inline-flex"
      >
        <icon-base
          class="w-4 h-4 text-gray-300 dark:text-darkGray-400 group-hover:text-white dark:group-hover:text-darkGray-900"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <icon-thumbs-down />
        </icon-base>
        <span
          class="text-xs text-gray-500 dark:text-darkGray-400 group-hover:text-white dark:group-hover:text-darkGray-900"
          >100</span
        >
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconThumbsDown from '@/components/icons/IconThumbsDown.vue';

export default defineComponent({
  components: {
    IconBase,
    IconThumbsUp,
    IconThumbsDown,
  },
  props: {
    name: String,
    icon: String,
  },
  setup(props) {
    const iconHref = require(`@/assets/img/${props.icon}`);

    return {
      iconHref,
    };
  },
});
</script>
