import { ref, onUnmounted, watch, Ref, computed } from 'vue';
import { Abi } from '@polkadot/api-contract';
import { u8aToString } from '@polkadot/util';
import { ActionTypes } from '@/store/action-types';
import { useStore } from 'vuex';
import { useApi } from '.';

interface FileState {
  data: Uint8Array;
  name: string;
  size: number;
}

interface AbiState {
  abi: string | null;
  abiName: string | null;
  contractAbi: Abi | null;
  errorText: string | null;
  isAbiError: boolean;
  isAbiValid: boolean;
  isAbiSupplied: boolean;
}

interface UseAbi extends AbiState {
  onChangeAbi: (u8a: Uint8Array, name: string) => void;
  onRemoveAbi: () => void;
}

function fromInitial(initialValue: [string | null | undefined, Abi | null | undefined], isRequired: boolean): AbiState {
  return {
    abi: initialValue[0] || null,
    abiName: null,
    contractAbi: initialValue[1] || null,
    errorText: null,
    isAbiError: false,
    isAbiSupplied: !!initialValue[1],
    isAbiValid: !isRequired || !!initialValue[1]
  };
}

const EMPTY: AbiState = {
  abi: null,
  abiName: null,
  contractAbi: null,
  errorText: null,
  isAbiError: false,
  isAbiSupplied: false,
  isAbiValid: false
};

export default function useAbi(initialValue: [string | null | undefined, Abi | null | undefined] = [null, null], codeHash: string | null = null, isRequired = false) {
  const abi = ref(fromInitial(initialValue, isRequired));

  const { api } = useApi();

  const registry = api?.value?.registry;
  const chainProperties = registry?.getChainProperties()

  const store = useStore();

  const onChangeAbi = ({ data, name }: FileState): void => {
    const json = u8aToString(data);

    console.log('afs', json)

    try {
      // @ts-ignore
      abi.value = {
        abi: json,
        abiName: name.replace('.contract', '').replace('.json', '').replace('_', ' '),
        contractAbi: new Abi(json, chainProperties),
        errorText: null,
        isAbiError: false,
        isAbiSupplied: true,
        isAbiValid: true
      }

      codeHash && store.dispatch(ActionTypes.SAVE_CODE, {
        api: api?.value,
        _codeHash: codeHash,
        partial: { abi: json },
      });
    } catch (error) {
      console.error(error);

      abi.value = {
        ...EMPTY, errorText: (error as Error).message
      }
    }
  }

  const onRemoveAbi = (): void => {
    abi.value = EMPTY;

    codeHash && store.dispatch(ActionTypes.SAVE_CODE, {
      api: api?.value,
      _codeHash: codeHash,
      partial: { abi: null },
    });
  };


  return {
    abi,
    onChangeAbi,
    onRemoveAbi,
  };
}
