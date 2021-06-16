import { ref, watch } from 'vue';
// import useAbi from '@/hooks/useAbi';
import type { AbiMessage, AbiParam } from '@polkadot/api-contract/types';
import type { TypeDef } from '@polkadot/types/create/types';

export default function useMessages(abi: any) {
  // should be fixed
  // const { abi } = useAbi();

  const messages = ref<
    | {
        identifier: string;
        docs: string[];
        args: AbiParam[];
        returnType?: TypeDef | null;
        isConstructor?: boolean;
      }[]
    | null
  >(null);

  watch(
    abi,
    () => {
      if (abi?.value?.constructors && abi?.value?.messages) {
        console.log('abi', abi.value);
        const constructors = abi?.value?.constructors.map((e: AbiMessage) => {
          return {
            identifier: e.identifier,
            docs: e.docs,
            args: e.args,
            returnType: e.returnType,
            isConstructor: e.isConstructor,
          };
        });
        const msgs = abi?.value?.messages.map((e: AbiMessage) => {
          return {
            identifier: e.identifier,
            docs: e.docs,
            args: e.args,
            returnType: e.returnType,
            isConstructor: e.isConstructor,
          };
        });
        messages.value = [...constructors, ...msgs];
      }
    },
    { immediate: true }
  );

  return { messages };
}
