import { usePolkadotContainerContext } from '@/api';
import { useIsMountedRef } from './useIsMountedRef';
import { reactive, toRefs, readonly, onMounted, watchEffect } from 'vue';
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
    let state = reactive<UseAccounts>({
        allAccounts: [],
        hasAccounts: false,
        isAccount: () => false,
    });

    watchEffect((onInvalidate) => {
        const subscription = keyring.accounts.subject.subscribe((accounts) => {
            // only subscribe to the keyring if the component that originally called this hook is still mounted
            if (mountedRef.value) {
                const allAccounts = accounts ? Object.keys(accounts) : [];
                const hasAccounts = allAccounts.length !== 0;
                const isAccount = (address: string) => allAccounts.includes(address);

                state = reactive({
                    allAccounts,
                    hasAccounts,
                    isAccount,
                });
            }
        });

        // unsubscribe from the keyring if the parent component is unmounted
        onInvalidate(() => {
            subscription.unsubscribe();
        });
    });

    return toRefs(readonly(state));
};
