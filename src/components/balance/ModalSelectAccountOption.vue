<template>
  <li
    role="option"
    class="text-blue-900 dark:text-darkGray-100 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 dark:hover:bg-darkGray-700"
  >
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="onChange(keyIdx)"
    >
      <div class="flex items-center">
        <div
          class="h-8 w-8 rounded-full overflow-hidden border border-gray-100 mr-3 flex-shrink-0"
        >
          <icon-base class="h-full w-full" viewBox="0 0 64 64">
            <icon-account-sample />
          </icon-base>
        </div>
        <div>
          <div class="text-sm font-medium">{{ addressName }}</div>
          <div class="text-xs text-gray-500 dark:text-darkGray-400">
            {{ shortenAddress }}
          </div>
        </div>
      </div>
      <!-- <div class="text-sm">100PLM</div> -->

      <div class="relative w-5 h-5" v-if="checked">
        <input
          name="choose_account"
          type="radio"
          class="appearance-none border-2 border-gray-300 dark:border-darkGray-600 rounded-full focus:ring-blue-500 h-4 w-4 mr-3 focus:outline-none bg-white dark:bg-darkGray-900 checked:border-4 checked:border-blue-500"
          :checked="checked"
        />
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import IconBase from '@/components/icons/IconBase.vue';
import IconAccountSample from '@/components/icons/IconAccountSample.vue';

export default defineComponent({
  components: {
    IconBase,
    IconAccountSample,
  },
  props: {
    keyIdx: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    addressName: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { address } = toRefs(props);

    const shortenAddress = computed(() => {
      return address.value
        ? `${address.value.slice(0, 6)}${'.'.repeat(6)}${address.value.slice(
            -6
          )}`
        : '';
    });

    const onChange = (keyIdx: Number) => {
      emit('update:sel-option', keyIdx);
    };

    return {
      shortenAddress,
      onChange,
    };
  },
});
</script>
