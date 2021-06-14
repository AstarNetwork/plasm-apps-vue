<template>
  <div>
    <message
      v-for="message in messages"
      :message="message"
      :key="message.identifier"
    />
  </div>
</template>
<script lang="ts">
// import useAbi from '@/hooks/useAbi';
import { defineComponent, PropType } from 'vue';
import type { TypeDef } from '@polkadot/types/create/types';
import type { AbiParam } from '@polkadot/api-contract/types';
import Message from './Message.vue';
interface MessageType {
  identifier: string;
  docs: string[];
  args: AbiParam[];
  returnType?: TypeDef | null;
  isConstructor?: boolean;
}
export default defineComponent({
  props: {
    messages: {
      required: true,
      type: Array as PropType<MessageType[] | null>,
    },
  },
  components: { Message },
  setup() {
    //TODO use useAbi once it's fixed

    return {};
  },
});
</script>
