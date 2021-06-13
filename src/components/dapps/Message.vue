<template>
  <div class="my-2 py-1 px-2 dark:text-white dark:bg-darkGray-800 rounded-sm">
    <div class="flex">
      <div
        class="font-semibold"
        :class="[message.isConstructor ? 'text-blue-400' : 'text-yellow-400']"
      >
        {{ message.identifier }}
      </div>
      <div>{{ `(${argsString})${returnTypeString}` }}</div>
    </div>
    docs:{{ docsString }}
  </div>
</template>
<script lang="ts">
// import useAbi from '@/hooks/useAbi';
import { PropType, defineComponent } from 'vue';
import type { AbiParam } from '@polkadot/api-contract/types';
import type { TypeDef } from '@polkadot/types/create/types';
interface MessageType {
  identifier: string;
  docs: string[];
  args: AbiParam[];
  returnType?: TypeDef | null;
  isConstructor?: boolean;
}
export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<MessageType>,
    },
  },
  setup(props) {
    const msg = props.message;

    let argsString = msg.args
      .map(({ name, type }) => `${name}: ${type.type}`)
      .join(', ');
    if (!argsString.length) {
      argsString = ' ';
    }

    const docsString = msg.docs.join('\n');
    const returnTypeString = msg.returnType ? `: ${msg.returnType!.type}` : '';

    return { argsString, docsString, returnTypeString };
  },
});
</script>
