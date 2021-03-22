import { useIsMountedRef } from './useIsMountedRef';
import { reactive, toRefs, watchEffect } from 'vue';
import { keyring } from '@polkadot/ui-keyring';

interface UseAccounts {
  allAccounts: string[];
  hasAccounts: boolean;
  isAccount: (address: string) => boolean;
}

/**
 * Access the global keyring state to get a readonly value of the list of loaded accounts in the page.
 * The hooks should only be called from the `setup()` block of the vue component
 */
export const useAccount = () => {
  const mountedRef = useIsMountedRef();

  // set the initial value
  const state = reactive<UseAccounts>({
    allAccounts: [],
    hasAccounts: false,
    isAccount: () => false,
  });

  watchEffect((onInvalidate) => {
    // fixme: this part is showing an error when fetching accounts
    const subscription = keyring.accounts.subject.subscribe((accounts) => {
      // only subscribe to the keyring if the component that originally called this hook is still mounted
      if (mountedRef.value) {
        // fixme: this is an unintuitive method to assign values. We need to find a scalable method
        state.allAccounts = accounts ? Object.keys(accounts) : [];
        state.hasAccounts = state.allAccounts.length !== 0;
        state.isAccount = (address: string) =>
          state.allAccounts.includes(address);

        console.log(state);
      }
    });

    // unsubscribe from the keyring if the parent component is unmounted
    onInvalidate(() => {
      subscription.unsubscribe();
    });
  });

  return toRefs(state);
};
