<template>
  <div
    class="border border-gray-300 dark:border-darkGray-500 rounded-md relative"
  >
    <div
      class="flex items-center border-b border-gray-300 dark:border-darkGray-500"
    >
      <div class="flex-1 pl-4">
        <input
          class="w-full text-blue-900 dark:text-darkGray-100 text-2xl focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-darkGray-600"
          inputmode="decimal"
          type="number"
          min="0"
          pattern="^[0-9]*(\.)?[0-9]*$"
          placeholder="0.0"
          :value="balance"
          @input="update($event.target.value, unit)"
        />
      </div>
      <button
        v-if="maxBalanceInDefaultUnit"
        type="button"
        @click="setMaxAmount"
        class="bg-blue-100 dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 text-xs rounded-full px-3 py-2 text-blue-900 dark:text-darkGray-900 mx-3 focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-blue-300"
      >
        MAX
      </button>
      <div
        class="text-blue-900 dark:text-darkGray-100 text-lg border-l border-gray-300 dark:border-darkGray-500 px-3 py-4"
      >
        <select
          name="units"
          class="dark:bg-darkGray-900"
          :value="unit"
          @change="update(balance, $event.target.value)"
        >
          <option v-for="item in arrUnitNames" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { getUnitNames, defaultUnitIndex } from '@/helper/units';
import BN from 'bn.js';
export default defineComponent({
  props: {
    unit: { type: String, required: true },
    maxBalanceInDefaultUnit: Object as PropType<BN>,
    balance: { required: true, type: Object as PropType<BN> },
  },
  emits: ['update:balance', 'update:unit', 'input'],
  setup(props, { emit }) {
    const arrUnitNames = getUnitNames(props.unit);
    const setMaxAmount = () => {
      if (props.maxBalanceInDefaultUnit) {
        emit('update:balance', props.maxBalanceInDefaultUnit);
        emit('update:unit', arrUnitNames[defaultUnitIndex]);
      }
    };
    const update = (balance: number, unit: string) => {
      emit('update:balance', balance);
      emit('update:unit', unit);
      emit('input', { balance, unit });
    };
    return { arrUnitNames, setMaxAmount, update };
  },
});
</script>
