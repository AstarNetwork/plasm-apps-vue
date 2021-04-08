import { ref, onUnmounted, watch, Ref, reactive, toRefs } from 'vue';
import { useIsMountedRef } from './useIsMountedRef';
import { Codec } from '@polkadot/types/types';
import { VoidFn } from '@polkadot/api/types';
import { useApi } from '@/hooks';
import BN from 'bn.js';
import { AccountInfo } from '@polkadot/types/interfaces';

interface UseCall {
  value?: Codec;
}

function useCall(section: string, method: string, addressRef: Ref<string>) {
  const mountedRef = useIsMountedRef();

  const { api: apiRef } = useApi();
  const state = reactive<UseCall>({
    value: undefined,
  });

  const unsub: Ref<VoidFn | undefined> = ref();

  watch(
    () => addressRef.value,
    (address) => {
      console.log('addr', address);

      const api = apiRef?.value;
      if (mountedRef) {
        if (unsub.value) {
          unsub.value();
          unsub.value = undefined;
        }
        if (
          address &&
          api &&
          api.query[section] &&
          api.query[section][method]
        ) {
          api.isReady.then(async () => {
            unsub.value = await api.queryMulti(
              [[api.query[section][method], address]],
              ([result]) => {
                state.value = result;
              }
            );
          });
        }
      }
    },
    { immediate: true }
  );

  onUnmounted(() => {
    const unsubFn = unsub.value;
    if (unsubFn) {
      unsubFn();
    }
  });
  return {
    ...toRefs(state),
  };
}

export function useBalance(addressRef: Ref<string>) {
  const balance = ref(new BN(0));

  const { value: accountInfoRef } = useCall('system', 'account', addressRef);

  watch(
    () => accountInfoRef?.value,
    (accountInfo) => {
      if (accountInfo) {
        balance.value = ((accountInfo as unknown) as AccountInfo).data.free.toBn();
        console.log('b', balance.value.toString(10));
      }
    },
    { immediate: true }
  );

  return { balance };
}
