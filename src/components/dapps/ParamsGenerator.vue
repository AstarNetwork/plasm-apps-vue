<template>
  <div class="relative">
    <label
      class="block text-sm font-medium text-gray-500 dark:text-darkGray-400 mb-2"
    >
      Instantiation Constructor
    </label>

    <button
      type="button"
      @click="openOption = !openOption"
      class="relative text-blue-900 dark:text-darkGray-100 w-full bg-white dark:bg-darkGray-900 border border-gray-300 dark:border-darkGray-500 rounded-md pl-3 pr-10 py-3 text-left focus:outline-none focus:ring focus:ring-blue-100 dark:focus:ring-darkGray-600 hover:bg-gray-50 dark:hover:bg-darkGray-800"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex">
            <div class="font-semibold text-blue-400">
              {{ constructors[constructorIndex].identifier }}
            </div>
            <div>{{ `(${argsStrings[constructorIndex]})` }}</div>
          </div>
        </div>
      </div>

      <span
        class="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
      >
        <!-- Heroicon name: solid/selector -->
        <icon-base
          class="h-5 w-5 text-gray-400 dark:text-darkGray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
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
        class="max-h-56 rounded-md text-base overflow-auto focus:outline-none"
      >
        <div
          v-for="constructor in constructors"
          :key="constructor.index"
          class="hover:bg-gray-50 dark:hover:bg-darkGray-700 cursor-pointer"
          @click="onSelectConstructor(constructor.index)"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex dark:text-white px-4 py-2">
                <div class="font-semibold text-blue-400">
                  {{ constructor.identifier }}
                </div>
                <div>{{ `(${argsStrings[constructor.index]})` }}</div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { getArgsString } from '@/helper/params';

// import useAbi from '@/hooks/useAbi';
import { defineComponent, PropType, ref } from 'vue';
import { MessageType } from '@/types/Message';
import IconSolidSelector from '@/components/icons/IconSolidSelector.vue';
import IconBase from '@/components/icons/IconBase.vue';

export default defineComponent({
  props: {
    constructors: {
      required: true,
      type: Array as PropType<MessageType[]>,
    },
  },
  components: {
    IconBase,
    IconSolidSelector,
  },
  setup(props) {
    //TODO use useAbi once it's fixed
    const constructorIndex = ref<number>(0);
    const openOption = ref<boolean>(false);
    const argsStrings = props.constructors
      .map(getArgsString)
      .map((argString) => (argString ? argString : ' '));
    const onSelectConstructor = (index: number) => {
      constructorIndex.value = index;
      openOption.value = false;
    };
    return {
      constructorIndex,
      openOption,
      argsStrings,
      onSelectConstructor,
    };
  },
});
</script>
