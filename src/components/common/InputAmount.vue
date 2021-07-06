<template>
  <div>
    <label
      class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
    >
      {{ title }}
    </label>
    <div
      class="border border-gray-300 dark:border-darkGray-500 rounded-md relative"
    >
      <div
        class="flex items-center border-b border-gray-300 dark:border-darkGray-500"
      >
        <div class="flex-1 pl-8">
          <input
            class="w-full text-blue-900 dark:text-darkGray-100 text-2xl focus:outline-none bg-transparent placeholder-gray-300 dark:placeholder-darkGray-600"
            inputmode="decimal"
            type="number"
            min="0"
            pattern="^[0-9]*(\.)?[0-9]*$"
            placeholder="0.0"
            :value="amount"
            @input="$emit('update:amount', $event.target.value)"
          />
        </div>
        <button
          v-if="!noMax"
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
            v-if="!fixUnit"
            name="units"
            class="dark:bg-darkGray-900"
            :value="selectedUnit"
            @change="$emit('update:selectedUnit', $event.target.value)"
          >
            <option v-for="item in arrUnitNames" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
          <div v-else>
            {{ selectedUnit }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, inject } from 'vue';
import {
  setDefaultUnitName,
  getUnitNames,
  defaultUnitIndex,
} from '@/helper/units';
import BN from 'bn.js';
export default defineComponent({
  props: {
    title: { type: String },
    noMax: { type: Boolean },
    selectedUnit: { type: String },
    maxInDefaultUnit: Object as PropType<BN>,
    fixUnit: { type: Boolean, default: false },
    amount: { required: true, type: Object as PropType<BN> },
  },
  emits: ['update:amount', 'update:selectedUnit'],
  setup(props, { emit }) {
    const defaultUnit = inject('unitToken', '');
    setDefaultUnitName(defaultUnit);

    const arrUnitNames = getUnitNames();
    const setMaxAmount = () => {
      if (props.maxInDefaultUnit) {
        emit('update:selectedUnit', arrUnitNames[defaultUnitIndex]);
        emit('update:amount', props.maxInDefaultUnit);
      }
    };
    return { arrUnitNames, setMaxAmount };
  },
});
</script>
