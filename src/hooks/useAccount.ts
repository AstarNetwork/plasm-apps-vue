import { useIsMountedRef } from './useIsMountedRef';
import { reactive, toRefs, watchEffect } from 'vue';
import { u8aToHex } from '@polkadot/util';
import { keyring } from '@polkadot/ui-keyring';

interface UseAccounts {
  allAccounts: string[];
  allAccountNames: string[];
  defaultAccount: string;
  defaultAccountName: string;
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
    allAccountNames: [],
    defaultAccount: '',
    defaultAccountName: '',
    hasAccounts: false,
    isAccount: () => false,
  });

  const accounts = keyring.getAccounts();
  console.log('accounts', accounts);
  accounts.forEach(({ address, meta, publicKey }) =>
    console.log(address, JSON.stringify(meta), u8aToHex(publicKey))
  );

  watchEffect((onInvalidate) => {
    // fixme: this part is showing an error when fetching accounts
    const subscription = keyring.accounts.subject.subscribe((accounts) => {
      // only subscribe to the keyring if the component that originally called this hook is still mounted
      if (mountedRef.value) {
        // fixme: this is an unintuitive method to assign values. We need to find a scalable method
        state.allAccounts = accounts ? Object.keys(accounts) : [];
        state.allAccountNames = accounts
          ? Object.values(accounts).map((obj) => obj.option.name)
          : [];
        state.defaultAccount =
          state.allAccounts.length > 0 ? Object.keys(accounts)[0] : '';
        state.defaultAccountName =
          state.allAccounts.length > 0
            ? Object.values(accounts)[0].option.name
            : '';
        state.hasAccounts = state.allAccounts.length !== 0;
        state.isAccount = (address: string) =>
          state.allAccounts.includes(address);
      }
    });

    // unsubscribe from the keyring if the parent component is unmounted
    onInvalidate(() => {
      subscription.unsubscribe();
    });
  });

  return toRefs(state);
};
