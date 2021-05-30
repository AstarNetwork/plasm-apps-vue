// https://github.com/paritytech/canvas-ui/blob/master/packages/react-hooks/src/useAbi.ts

import { ref, onUnmounted, watch, Ref, computed } from 'vue';
// import store from '@canvas-ui/react-store/store';
import type {
  ChainProperties,
  ContractProject,
} from '@polkadot/types/interfaces';

import { Abi } from '@polkadot/api-contract';
import { AnyJson } from '@polkadot/types/types';
import { u8aToString } from '@polkadot/util';

import { useApi } from '.';

interface CodeBase {
  id: string;
  codeHash: string;
  name: string;
  genesisHash: string;
  tags: string[];
}
export interface Code extends CodeBase {
  abi?: AnyJson | null;
}

export interface FileState {
  data: Uint8Array;
  name: string;
  size: number;
}

interface UseAbi {
  abi: Abi | null;
  errorText: string | null;
  isAbiError: boolean;
  isAbiValid: boolean;
  isAbiSupplied: boolean;
  onChangeAbi: (_: FileState) => void;
  onRemoveAbi: () => void;
}

type State = [Abi | null, boolean, boolean];

interface AbiSpecOutdated {
  deploy?: any;
  messages?: any;
  registry?: {
    strings?: any;
  };
}

export default function useAbi(source: Code | null = null, isRequired = false) {
  const { api } = useApi();

  const registry = api?.value?.registry;
  const chainProperties = registry?.getChainProperties() as
    | ChainProperties
    | undefined;

  const abi = source ? ref(new Abi(source?.abi, chainProperties)) : ref(null);
  const isAbiSupplied = ref(!!source?.abi);
  const isAbiValid = ref(!isRequired || !!source?.abi);

  const isAbiError = ref(false);
  const errorText = ref('');

  // watchEffect(
  //   (): void => {
  //     if (!!source?.abi && abi?.json !== source.abi) {
  //       setAbi([new Abi(source.abi, registry?.getChainProperties()), !!source.abi, !isRequired || !!source.abi]);
  //     }
  //   },
  //   [abi, registry, source, isRequired]
  // );

  // watch(
  //   () => abi?.value,
  //   (newAbi) => {
  //     if (newAbi.json !== source?.abi) {
  //       // @ts-ignore
  //       abi.value = new Abi(newAbi, chainProperties);
  //       isAbiSupplied.value = !!newAbi;
  //       isAbiValid.value = !isRequired || !!newAbi;
  //     }
  //   },
  //   { immediate: true }
  // )

  const onChangeAbi = ({ data }: FileState): void => {
    const json = u8aToString(data);

    console.log('afs', json);

    try {
      const abiOutdated = JSON.parse(json) as AbiSpecOutdated;

      if (abiOutdated.deploy || abiOutdated.messages) {
        throw new Error(
          'You are using an ABI with an outdated format. Please generate a new one.'
        );
      }

      const newAbi = JSON.parse(json) as AnyJson;

      //@ts-ignore
      abi.value = new Abi(newAbi, chainProperties);
      isAbiError.value = false;
      isAbiSupplied.value = true;
      isAbiValid.value = true;

      // source?.id && store.saveCode(
      //   { abi: newAbi },
      //   source.id
      // );
    } catch (error) {
      console.error(error);

      isAbiSupplied.value = false;
      isAbiValid.value = false;

      isAbiError.value = true;
      errorText.value = error;
    }
    // return  [api.registry, source, t]
  };

  const onRemoveAbi = (): void => {
    isAbiSupplied.value = false;
    isAbiValid.value = false;

    isAbiError.value = false;

    // source?.id && store.saveCode(
    //   { abi: null },
    //   source?.id
    // );

    // return [source]
  };

  return {
    abi,
    errorText,
    isAbiError,
    isAbiSupplied,
    isAbiValid,
    onChangeAbi,
    onRemoveAbi,
  };
}
