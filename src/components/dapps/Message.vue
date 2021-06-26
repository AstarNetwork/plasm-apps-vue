<template>
  <div
    class="cursor-default my-2 py-1 px-2 dark:text-white bg-gray-100 hover:bg-gray-200 dark:bg-darkGray-800 dark:hover:bg-darkGray-700 rounded-sm"
  >
    <div class="tooltip relative">
      <div class="flex">
        <div
          class="font-semibold"
          :class="[message.isConstructor ? 'text-blue-400' : 'text-yellow-400']"
        >
          {{ message.identifier }}
        </div>
        <div>{{ `(${argsString})${returnTypeString}` }}</div>
      </div>
      <!-- Tooltip -->
      <span
        class="tooltip-shadow dark:bg-darkGray-900 hidden absolute z-10 top-6 left-5 text-s dark:text-white bg-gray-800 rounded-md"
      >
        <div>
          <div
            class="flex bg-gray-100 dark:bg-darkGray-800 px-2 py-1 rounded-t-md"
          >
            <div
              class="font-semibold"
              :class="[
                message.isConstructor ? 'text-blue-400' : 'text-yellow-400',
              ]"
            >
              {{ message.identifier }}
            </div>
            <div>{{ `(${argsString})${returnTypeString}` }}</div>
          </div>
          <div
            class="leading-7 px-2 py-2 float-left w-96 bg-gray-200 dark:bg-darkGray-900"
          >
            {{ docsString }}
          </div>
        </div>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { MessageType } from '@/types/Message';
export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<MessageType>,
    },
  },
  setup(props) {
    let argsString = props.message.args
      .map(({ name, type }) => `${name}: ${type.type}`)
      .join(', ');
    if (!argsString.length) {
      argsString = ' ';
    }

    const docsString =
      props.message.docs.join('\n') || 'No documentation provided';
    const returnTypeString = props.message.returnType
      ? `: ${props.message.returnType!.type}`
      : '';

    return { argsString, docsString, returnTypeString };
  },
});
</script>

<style>
.tooltip-shadow {
  box-shadow: 2px 3px 3px 1px rgba(21, 19, 19, 0.427);
}
</style>
