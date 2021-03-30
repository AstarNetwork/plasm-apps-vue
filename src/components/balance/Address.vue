<template>
  <div
    class="relative z-0 inline-flex shadow rounded-lg bg-white dark:bg-darkGray-800"
  >
    <div
      class="relative inline-flex items-center py-4 px-1 sm:py-5 sm:px-2 rounded-l-lg flex-1 text-left"
    >
      <div class="flex items-center">
        <div
          class="h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden border border-gray-100 mx-2 sm:mx-3"
        >
          <icon-base class="h-full w-full" viewBox="0 0 64 64">
            <icon-account-sample />
          </icon-base>
        </div>
        <div>
          <p class="text-blue-900 dark:text-darkGray-100 font-bold">
            {{ addressName }}
          </p>
          <p class="text-xs text-gray-500 dark:text-darkGray-400">
            {{ shortenAddress }}
          </p>
        </div>
      </div>

      <button
        type="button"
        @click="openModal"
        class="tooltip ml-auto p-4 sm:p-5 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative"
      >
        <icon-chevron-down />

        <span
          class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg opacity-90"
        >
          Change
        </span>
      </button>
    </div>

    <div
      class="border-l border-gray-100 dark:border-darkGray-600 flex items-center px-1 md:px-2"
    >
      <button
        type="button"
        class="tooltip p-4 sm:p-5 rounded-full hover:bg-gray-100 dark:hover:bg-darkGray-600 focus:z-10 focus:outline-none focus:ring focus:ring-gray-100 dark:focus:ring-darkGray-600 focus:bg-blue-50 dark:focus:bg-darkGray-900 relative group"
      >
        <icon-document-duplicate />

        <!-- Tooltip -->
        <span
          class="pointer-events-none hidden absolute top-0 left-1/2 z-10 transform -translate-y-full -translate-x-1/2 p-2 text-xs leading-tight text-white bg-gray-800 dark:bg-darkGray-500 rounded-md shadow-lg"
        >
          Copy
        </span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconChevronDown from '@/components/icons/IconChevronDown.vue';
import IconDocumentDuplicate from '@/components/icons/IconDocumentDuplicate.vue';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
    IconChevronDown,
    IconDocumentDuplicate,
  },
  props: {
    address: {
      type: String,
      required: true,
    },
    addressName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openModal = () => {
      emit('update:is-open', true);
    };

    const { address, addressName } = toRefs(props);

    const shortenAddress = computed(() => {
      return `${address.value.slice(0, 6)}${'.'.repeat(6)}${address.value.slice(
        -6
      )}`;
    });

    return {
      openModal,
      shortenAddress,
      addressName,
    };
  },
});
</script>
