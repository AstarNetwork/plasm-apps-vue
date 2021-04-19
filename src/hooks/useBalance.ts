import { ref, onUnmounted, watch, Ref } from 'vue';
import { useIsMountedRef } from './useIsMountedRef';
import { VoidFn } from '@polkadot/api/types';
import { useApi } from '@/hooks';
import BN from 'bn.js';

function useCall(addressRef: Ref<string>) {
  const mountedRef = useIsMountedRef();

  const { api: apiRef } = useApi();
  const balanceRef = ref(new BN(0));

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
        if (address && api) {
          api.isReady.then(async () => {
            const {
              data: { free },
            } = await api.query.system.account(address);
            balanceRef.value = free.toBn();
            console.log(`The balances is ${free}`);
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
    balanceRef,
  };
}

export function useBalance(addressRef: Ref<string>) {
  const balance = ref(new BN(0));

  const { balanceRef } = useCall(addressRef);

  watch(
    () => balanceRef?.value,
    (bal) => {
      if (bal) {
        balance.value = bal;
        console.log('b', balance.value.toString(10));
      }
    },
    { immediate: true }
  );

  return { balance };
}
