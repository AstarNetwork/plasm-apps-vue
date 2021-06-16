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
import Message from './Message.vue';
import { MessageType } from '@/types/Message';

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
