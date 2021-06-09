<template>
  <div class="dark:text-white">{{ identifier '(' ')' )}}</div>
</template>
<script lang="ts">
// import useAbi from '@/hooks/useAbi';
import { PropType, defineComponent } from 'vue';
export type Message = {
  identifier: string;
  doc?: string;
  args: { name: string; type: string }[];
};
export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<Message>,
    },
  },
  //   setup(props) {
  //     let argsString = '';
  //     props.message.args.forEach(( { name, type },i) => {
  //         if (i !== props.message.args.length )
  //     });
  //   },
});
</script>
