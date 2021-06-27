<template>
  <div class="relative">
    <button
      type="button"
      @click="openOption = !openOption"
      class="relative text-blue-900 dark:text-darkGray-100 w-full bg-white dark:bg-darkGray-900 border border-gray-300 dark:border-darkGray-500 rounded-md pl-3 pr-10 py-3 text-left focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 hover:bg-gray-50 dark:hover:bg-darkGray-800"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-3 flex-shrink-0"
          >
            <icon-base class="h-full w-full" viewBox="0 0 64 64">
              <icon-account-sample />
            </icon-base>
          </div>

          <input
            class="w-full text-blue-900 dark:text-darkGray-100 text-xl focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-darkGray-600"
            style="width: 21rem"
            type="text"
            spellcheck="false"
            v-model="selAddress"
          />
        </div>
      </div>

      <span
        class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <icon-base
          class="h-5 w-5 text-gray-400 dark:text-darkGray-300"
          icon-name="selector"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <icon-solid-selector />
        </icon-base>
      </span>
    </button>

    <div
      v-if="openOption"
      class="block absolute mt-1 w-full rounded-md bg-white dark:bg-darkGray-800 shadow-lg z-10 border border-gray-200 dark:border-darkGray-600"
    >
      <ul
        class="max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none"
      >
        <!-- Select option -->
        <ModalSelectAccountOption
          v-for="(account, index) in allAccounts"
          :key="index"
          :key-idx="index"
          :address="account"
          :addressName="allAccountNames[index]"
          :checked="selAccountIdx === index"
          v-model:selOption="selAccountIdx"
        />
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';
import IconSolidSelector from '@/components/icons/IconSolidSelector.vue';
import ModalSelectAccountOption from '@/components/balance/ModalSelectAccountOption.vue';

export default defineComponent({
  components: {
    ModalSelectAccountOption,
    IconBase,
    IconAccountSample,
    IconSolidSelector,
  },
  props: {
    allAccounts: {
      type: Array,
      required: true,
    },
    allAccountNames: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const openOption = ref(false);

    const store = useStore();
    const currentAccountIdx = computed(() => store.getters.accountIdx);

    const selAccountIdx = ref(currentAccountIdx.value);

    const selAccount = ref(props.allAccounts[selAccountIdx.value] as string);
    const selAddress = ref(props.allAccounts[selAccountIdx.value] as string);
    const selAccountName = ref(props.allAccountNames[selAccountIdx.value]);

    watch(
      selAccountIdx,
      () => {
        selAccount.value = props.allAccounts[selAccountIdx.value] as string;
        selAccountName.value = props.allAccountNames[selAccountIdx.value];
        selAddress.value = props.allAccounts[selAccountIdx.value] as string;

        emit('update:sel-address', selAddress.value);

        openOption.value = false;
      },
      { immediate: true }
    );

    return {
      openOption,
      selAccountIdx,
      selAddress,
    };
  },
});
</script>
