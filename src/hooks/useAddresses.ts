import { useIsMountedRef } from './useIsMountedRef';
import { reactive, toRefs, watchEffect } from 'vue';
import { keyring } from '@polkadot/ui-keyring';

interface UseAddresses {
  allAddresses: string[];
  hasAddresses: boolean;
  isAddress: (address: string) => boolean;
}

export const useAddresses = () => {
  const mountedRef = useIsMountedRef();

  const state = reactive<UseAddresses>({
    allAddresses: [],
    hasAddresses: false,
    isAddress: () => false,
  });

  watchEffect((onInvalidate) => {
    const subscription = keyring.addresses.subject.subscribe((addresses) => {
      if (mountedRef.value) {
        state.allAddresses = addresses ? Object.keys(addresses) : [];
        state.hasAddresses = state.allAddresses.length !== 0;
        state.isAddress = (address: string): boolean =>
          state.allAddresses.includes(address.toString());
      }

      onInvalidate(() => {
        subscription.unsubscribe();
      });
    });
  });

  return toRefs(state);
};
