<template>
  <div class="dark:text-darkGray-400">contract view</div>
</template>
<script lang="ts">
import useAbi from '@/hooks/useAbi';
import { defineComponent, watch } from 'vue';
import type { AbiMessage, AbiConstructor } from '@polkadot/api-contract/types';

export default defineComponent({
  components: {},
  setup() {
    const { abi } = useAbi();

    watch(
      abi,
      () => {
        console.log('abi from contract view', abi.value);
        abi?.value?.constructors.forEach(({ args }) => {
          args.forEach((arg) => {
            const { name, type } = arg;
            console.log(name, 'NAME');
            console.log(type, 'TYPE');
          });
        });
        abi?.value?.messages.forEach((e: AbiMessage) => {
          const { docs, index, identifier, args, returnType } = e;
          console.log(docs, 'docs');
          console.log(index, 'index');
          console.log(identifier, 'identifier');
          console.log(args, 'args');
          console.log(returnType, 'return type');
        });
      },
      { immediate: true }
    );

    return {};
  },
});
</script>
